import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";
import {
  AUTH_COOKIE_NAME,
  AUTH_HEADER_NAME,
  AUTH_HEADER_PREFIX
} from "../consts";
import { JWT_SECRET } from "../config";
import logger from "../logger/logger";

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

const JwtValidationSchema = zod.object({
  email: preprocessEmail(zod.string().email())
});

/**
 * Get the token from the request.
 * @param req - The request.
 * @returns The token.
 */
function getToken(req: Parameters<RequestHandler>[0]): string | undefined {
  const authCookie = req.cookies[AUTH_COOKIE_NAME] as unknown;

  const authHeader = req.headers[AUTH_HEADER_NAME];

  // Do not allow to have both header and cookie
  if (typeof authHeader === "string" && typeof authCookie === "string")
    return "";

  if (
    typeof authHeader === "string" &&
    authHeader.startsWith(AUTH_HEADER_PREFIX)
  )
    return authHeader.slice(AUTH_HEADER_PREFIX.length);

  if (typeof authCookie === "string") return authCookie;

  return undefined;
}

export const appendJwt: RequestHandler = (req, _res, next) => {
  const token = getToken(req);

  if (typeof token === "string")
    jwt.verify(token, JWT_SECRET, (jwtError, decoded) => {
      if (jwtError) logger.warn("Jwt verification failed", jwtError);
      else {
        const parsed = JwtValidationSchema.safeParse(decoded);

        if (parsed.success) {
          req.jwt = parsed.data;
          req.userId = parsed.data.email; // Ensure req.userId is set
        } else {
          logger.warn("Jwt verification failed", parsed.error);
        }
      }
    });

  next();
};
