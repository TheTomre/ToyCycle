/* eslint-disable i18n-text/no-en -- Postponed, decide if lang file is needed */

import {
  ADMIN_EMAIL,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  JWT_SECRET
} from "../config";
import {
  AUTH0_SCOPE,
  AUTH_COOKIE_EXPIRATION_LIFETIME_MS,
  AUTH_COOKIE_LIFETIME_MS,
  AUTH_COOKIE_NAME,
  JWT_EXPIRES_IN
} from "../consts";
import { requireJwtAdmin, requireJwtUser } from "../middleware";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { logger } from "../services";
import passport from "passport";
import zod from "zod";

const auth0Router = Router();

auth0Router
  .get(
    "/callback",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Postponed
    passport.authenticate("auth0", {
      failureRedirect: AUTH0_RETURN_URL
    }),
    (req, res, next) => {
      if (req.isAuthenticated()) {
        const user = Auth0UserValidationSchema.parse(req.user);

        const token = jwt.sign({ email: user.emails[0].value }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        req.logout(err => {
          if (err) next(err);
          else
            res
              .cookie(AUTH_COOKIE_NAME, token, {
                domain: COOKIE_DOMAIN,
                expires: new Date(Date.now() + AUTH_COOKIE_LIFETIME_MS),
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                secure: true
              })
              .send(redirectHtml);
        });
      } else res.redirect(AUTH0_RETURN_URL);
    }
  )
  .get(
    "/login",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Postponed
    passport.authenticate("auth0", { scope: AUTH0_SCOPE }),
    (_req, res) => {
      res.redirect(AUTH0_RETURN_URL);
    }
  )
  .get("/logout", (_req, res) => {
    res
      .cookie(AUTH_COOKIE_NAME, "", {
        domain: COOKIE_DOMAIN,
        expires: new Date(Date.now() - AUTH_COOKIE_EXPIRATION_LIFETIME_MS),
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: true
      })
      .send(redirectHtml);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Ok
  .get("/me", async (req, res, next) => {
    try {
      const result = await new Promise<Jwt | undefined>(resolve => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
        const token = req.cookies[AUTH_COOKIE_NAME] as unknown;

        if (typeof token === "string")
          jwt.verify(token, JWT_SECRET, (jwtError, decoded) => {
            if (jwtError) logger.warn("Jwt verification failed", jwtError);
            else {
              const parsed = JwtValidationSchema.safeParse(decoded);

              if (parsed.success) resolve(parsed.data);
              else logger.warn("Jwt verification failed", parsed.error);
            }
          });

        resolve(undefined);
      });

      if (result) {
        const { email } = result;

        res.status(StatusCodes.OK).json({
          admin: ADMIN_EMAIL.includes(email),
          email
        });
      } else res.status(StatusCodes.OK).json(null);
    } catch (err) {
      next(err);
    }
  })
  .get("/test/admin", requireJwtAdmin, (_req, res) => {
    res.send("Protected admin route");
  })
  .get("/test/private", requireJwtUser, (_req, res) => {
    res.send("Protected route");
  })
  .get("/test/public", (_req, res) => {
    res.send("Public route");
  });

export default auth0Router;

const Auth0UserValidationSchema = zod
  // Do not use strictObject: auth0 may return additional fields
  .object({
    emails: zod
      .array(zod.strictObject({ value: zod.string() }))
      .nonempty()
      .max(1)
  });

const JwtValidationSchema = zod.object({
  email: preprocessEmail(zod.string().email())
});

const redirectHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="refresh" content="0;url=${AUTH0_RETURN_URL}">
          <title>Redirecting...</title>
      </head>
      <body>
          <p>If you are not redirected automatically, follow this <a href="${AUTH0_RETURN_URL}">link to the new page</a>.</p>
      </body>
    </html>
  `;

/**
 * Preprocesses a schema to unify emails (lowercase).
 * @param schema - The schema to preprocess.
 * @returns The preprocessed schema.
 */
function preprocessEmail<T extends zod.ZodTypeAny>(
  schema: T
): zod.ZodEffects<T> {
  return zod.preprocess(
    value => (typeof value === "string" ? value.toLowerCase() : value),
    schema
  );
}

interface Jwt {
  readonly email: string;
}
