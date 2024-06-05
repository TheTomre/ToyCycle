import express from "express";
import {
  createNewToy,
  deleteToyById,
  getAllToys,
  getToyById,
  updateToyById
} from "../controllers/toyControllers";

const router = express.Router();

router.post("/", createNewToy);
router.get("/", getAllToys);
router.get("/:id", getToyById);
router.put("/:id", updateToyById);
router.delete("/:id", deleteToyById);

export default router;
