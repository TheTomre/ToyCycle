import { Router } from "express";
import auth0Router from "./auth";
import userRouter from "./userRoutes";

const router = Router();

router.use("/auth", auth0Router);
router.use("/users", userRouter);

export default router;
