import { Router } from "express";
import auth0Router from "./auth";

const router = Router();

router.use("/auth", auth0Router);

export default router;
