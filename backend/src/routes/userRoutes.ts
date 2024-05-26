/* eslint-disable @typescript-eslint/no-misused-promises  -- Posponed */

import controller from "../users/controller";
import express from "express";

const router = express.Router();

router.get("/users", controller.getAllUsers);
router.post("/users", controller.createNewUser);

router.get("/users/:id", controller.getUserById);
router.put("/users/:id", controller.updateUserById);
router.delete("/users/:id", controller.deleteUserById);

export default router;
