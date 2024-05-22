import "express";

declare module "express-serve-static-core" {
  interface Request {
    jwt?: { readonly email: string };
  }
}
