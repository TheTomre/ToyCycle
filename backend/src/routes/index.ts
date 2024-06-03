import { Router } from "express";
import auth0Router from "./auth";
import userRouter from "./userRoutes";
import toyRoutes from "./toyRoutes";

const router = Router();

router.use("/auth", auth0Router);
router.use("/users", userRouter);
router.use("/toys", toyRoutes);

export default router;
