/* eslint-disable @typescript-eslint/no-misused-promises */
import Toy, { ToyType } from "../models/Toy";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

const STATUS = {
  BAD_REQUEST: 400,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  OK: 200
};

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
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const toys = await Toy.find({});
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
      const toy = await Toy.findByIdAndUpdate<Partial<ToyType>>(
        req.params["id"],
        // Disabling @typescript-eslint/no-unsafe-argument because req.body is validated properly by mongoose schema
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
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
