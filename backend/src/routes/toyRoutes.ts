import express from "express";
import multer from "multer";
import { jwtCheck, jwtParse, validateToyMeRequest } from "../middleware";
import {
  createNewToy,
  deleteToyById,
  getAllToys,
  getToyById,
  updateToyById
} from "../controllers/toyControllers";

const storage = multer.memoryStorage();
const uplode = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

const router = express.Router();
router.post(
  "/me",
  uplode.array("images", 3),
  validateToyMeRequest,
  jwtCheck,
  jwtParse,
  createNewToy
);
router.post("/", createNewToy);
router.get("/", getAllToys);
router.get("/:id", getToyById);
router.put("/:id", updateToyById);
router.delete("/:id", deleteToyById);

router.get("/me", getToyById);
router.put("/me", updateToyById);
router.delete("/me", deleteToyById);

export default router;
