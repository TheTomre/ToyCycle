import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Toy, { PartialToyType, ToyType } from "../models/toyModel";

import logger from "../logger/logger";

export const createToy = async (req: Request) => {
  try {
    const image = req.file as Express.Multer.File;
    const base64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64}`;

    const uploadeResponce = await cloudinary.uploader.upload(dataURI);

    const newToy = await Toy.create(req.body);
    newToy.images.push(uploadeResponce.url);
    // newToy.images.push(uploadeResponce.url);
    newToy.user = new mongoose.Types.ObjectId(req.userId);

    await newToy.save();
    logger.info(`Toy ${newToy.name} created`);
    return newToy;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const fetchToyById = async (id: string) => {
  try {
    const toy = await Toy.findById(id);
    if (!toy) return undefined;
    logger.info(`Toy ${toy.name} fetched successfully`);
    return toy;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const fetchAllToys = async (page: number, limit: number) => {
  try {
    const toys = await Toy.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Toy.countDocuments({});
    logger.info("Toys fetched successfully");
    return { toys, total };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const updateToyById = async (id: string, data: PartialToyType) => {
  try {
    const updateFields: Partial<Record<keyof ToyType, unknown>> = {};
    const unsetFields: Partial<Record<keyof ToyType, "" | undefined>> = {};

    Object.keys(data).forEach(key => {
      if (
        data[key as keyof PartialToyType] === null ||
        data[key as keyof PartialToyType] === undefined
      ) {
        unsetFields[key as keyof ToyType] = "";
      } else {
        updateFields[key as keyof ToyType] = data[key as keyof PartialToyType];
      }
    });

    const updateQuery = {
      $set: updateFields,
      ...(Object.keys(unsetFields).length > 0 && { $unset: unsetFields })
    };

    const updatedToy = await Toy.findByIdAndUpdate(id, updateQuery, {
      new: true,
      runValidators: true
    });
    if (!updatedToy) return undefined;
    logger.info(`Toy ${updatedToy.name} updated successfully`);
    return updatedToy;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteToyById = async (id: string) => {
  try {
    const toy = await Toy.findByIdAndDelete(id);
    if (!toy) return undefined;
    logger.info(`Toy ${toy.name} deleted successfully`);
    return toy;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
