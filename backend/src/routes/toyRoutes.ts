/* eslint-disable no-type-assertion/no-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Toy, { PartialToyType } from "../models/Toy";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

const STATUS = {
  BAD_REQUEST: 400,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  OK: 200
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const DEFAULT_SORT = "asc";

// Create Toy
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const toy = new Toy(req.body);
      await toy.save();
      res.status(STATUS.CREATED).send(toy);
    } catch (err) {
      next(err);
    }
  }
);

// Read Toys
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        limit = DEFAULT_LIMIT,
        page = DEFAULT_PAGE,
        sort = DEFAULT_SORT
      } = req.query;
      const sortOrder = sort === "asc" || sort === "desc" ? sort : DEFAULT_SORT;
      const toys = await Toy.find({})
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .sort({ name: sortOrder });
      res.status(STATUS.OK).send(toys);
    } catch (err) {
      next(err);
    }
  }
);

// Read Toy by ID
router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const toy = await Toy.findById(req.params["id"]);
      if (!toy) {
        res.status(STATUS.NOT_FOUND).send();
        return;
      }
      res.status(STATUS.OK).send(toy);
    } catch (err) {
      next(err);
    }
  }
);

// Update Toy
router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updatedToyData: PartialToyType = req.body;
      const updateFields: Record<string, unknown> = {};
      const unsetFields: Record<string, "" | undefined> = {};

      // Separate fields to be updated and fields to be unset
      for (const key in updatedToyData)
        if (
          updatedToyData[key as keyof PartialToyType] === null ||
          updatedToyData[key as keyof PartialToyType] === undefined
        )
          unsetFields[key] = "";
        else updateFields[key] = updatedToyData[key as keyof PartialToyType];

      const updateQuery = {
        $set: updateFields,
        ...(Object.keys(unsetFields).length > 0 && { $unset: unsetFields })
      };

      const updatedToy = await Toy.findByIdAndUpdate(
        req.params["id"],
        updateQuery,
        {
          new: true,
          runValidators: true
        }
      );

      if (!updatedToy) {
        res.status(STATUS.NOT_FOUND).send();
        return;
      }

      res.status(STATUS.OK).send(updatedToy);
    } catch (err) {
      next(err);
    }
  }
);

// Delete Toy
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const toy = await Toy.findByIdAndDelete(req.params["id"]);
      if (!toy) {
        res.status(STATUS.NOT_FOUND).send();
        return;
      }
      res.status(STATUS.OK).send(toy);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
