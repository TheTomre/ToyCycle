import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import passport from "passport";
import zod from "zod";
import logger from "../logger/logger";
import { requireJwtAdmin, requireJwtUser } from "../middleware";
import {
  AUTH0_SCOPE,
  AUTH_COOKIE_EXPIRATION_LIFETIME_MS,
  AUTH_COOKIE_LIFETIME_MS,
  AUTH_COOKIE_NAME,
  JWT_EXPIRES_IN
} from "../consts";
import {
  adminEmails,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  JWT_SECRET
} from "../config";

// Переместите определения функций и схем выше по коду
const preprocessEmail = <T extends zod.ZodTypeAny>(
  schema: T
): zod.ZodEffects<T> => {
  return zod.preprocess(
    value => (typeof value === "string" ? value.toLowerCase() : value),
    schema
  );
};

const Auth0UserValidationSchema = zod.object({
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

interface Jwt {
  readonly email: string;
}

const auth0Router = Router();

auth0Router
  .get(
    "/callback",
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
  .get("/me", async (req, res, next) => {
    try {
      const result = await new Promise<Jwt | undefined>(resolve => {
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
          admin: adminEmails.includes(email),
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
