import { Router } from "express";
import auth0Router from "./auth";
import toyRoutes from "./toyRoutes";

const router = Router();

router.use("/auth", auth0Router);
router.use("/toys", toyRoutes);

export default router;
