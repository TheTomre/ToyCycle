import { NextFunction, Request, Response } from "express";
import { STATUS, STATUS_MESSAGE } from "../consts/statusCodes";
import {
  createToy,
  fetchToyById,
  fetchAllToys,
  updateToyById as updateToy,
  deleteToyById as deleteToy
} from "../services/toyServices";
import logger from "../logger/logger";

export const createNewToy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newToy = await createToy(req.body);
    if (!newToy) {
      res.status(STATUS.BAD_REQUEST).json({
        message: "Toy not created",
        status: STATUS_MESSAGE.FAIL
      });
      return;
    }

    res.status(STATUS.CREATED).json(newToy);
    logger.info("Toy created successfully");
  } catch (err) {
    logger.error("Error creating toy:", err);
    next(err);
  }
};

export const getToyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const toyId = req.params["id"];
  if (!toyId) {
    res.status(STATUS.BAD_REQUEST).json({
      message: "Please provide a toy id",
      status: STATUS_MESSAGE.FAIL
    });
    return;
  }

  try {
    const toy = await fetchToyById(toyId);
    if (!toy) {
      res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Toy not found", status: STATUS_MESSAGE.FAIL });
      return;
    }

    res.status(STATUS.OK).json(toy);
    logger.info("Toy fetched successfully");
  } catch (err) {
    logger.error("Error fetching toy:", err);
    next(err);
  }
};

export const getAllToys = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const toys = await fetchAllToys();
    if (!toys) {
      res
        .status(STATUS.NOT_FOUND)
        .json({ message: "No toys found", status: STATUS_MESSAGE.FAIL });
      return;
    }

    res.status(STATUS.OK).json(toys);
    logger.info("Toys fetched successfully");
  } catch (err) {
    logger.error("Error fetching toys:", err);
    next(err);
  }
};

export const updateToyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const toyId = req.params["id"];
  if (!toyId) {
    res.status(STATUS.BAD_REQUEST).json({
      message: "Please provide a toy id",
      status: STATUS_MESSAGE.FAIL
    });
    return;
  }

  try {
    const updatedToy = await updateToy(toyId, req.body);
    if (!updatedToy) {
      res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Toy not found", status: STATUS_MESSAGE.FAIL });
      return;
    }

    res.status(STATUS.OK).json(updatedToy);
    logger.info("Toy updated successfully");
  } catch (err) {
    logger.error("Error updating toy:", err);
    next(err);
  }
};

export const deleteToyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const toyId = req.params["id"];
  if (!toyId) {
    res.status(STATUS.BAD_REQUEST).json({
      message: "Please provide a toy id",
      status: STATUS_MESSAGE.FAIL
    });
    return;
  }

  try {
    const deletedToy = await deleteToy(toyId);
    if (!deletedToy) {
      res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Toy not found", status: STATUS_MESSAGE.FAIL });
      return;
    }

    res.status(STATUS.OK).json(deletedToy);
    logger.info("Toy deleted successfully");
  } catch (err) {
    logger.error("Error deleting toy:", err);
    next(err);
  }
};

export default {
  createNewToy,
  deleteToyById,
  getAllToys,
  getToyById,
  updateToyById
};
