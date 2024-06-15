import { Request } from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { PAGINATION } from "../consts/pagination";
import { EXCLUDED_QUERY_FIELDS } from "../consts/queryFields";
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

export const fetchAllToys = async (req: Request) => {
  try {
    const { query } = req;
    const queryObj = { ...query };

    // FILTERING
    EXCLUDED_QUERY_FIELDS.forEach(el => delete queryObj[el]);

    const category = (query["category"] as string) || "";
    const ageCategory = (query["ageCategory"] as string) || "";
    const brand = (query["brand"] as string) || "";

    const buildRegexArray = (input: string) =>
      input.split(",").map(el => new RegExp(el, "i"));

    const searchFilters = [];
    if (category)
      searchFilters.push({ category: { $in: buildRegexArray(category) } });
    if (ageCategory)
      searchFilters.push({
        ageCategory: { $in: buildRegexArray(ageCategory) }
      });
    if (brand) searchFilters.push({ brand: { $in: buildRegexArray(brand) } });

    let toyQuery = Toy.find(
      searchFilters.length ? { $and: searchFilters } : {}
    );

    // FIELD LIMITING
    if (query["fields"]) {
      const fields = (query["fields"] as string).split(",").join(" ");
      toyQuery = toyQuery.select(fields);
    } else {
      toyQuery = toyQuery.select("-__v");
    }

    // SEARCHING
    if (query["search"]) {
      const search = query["search"] as string;
      const searchRegex = new RegExp(search, "i");
      toyQuery = toyQuery.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { brand: searchRegex }
        ]
      });
    }

    // SORTING
    if (query["sort"]) {
      const sortBy = (query["sort"] as string).split(",").join(" ");
      toyQuery = toyQuery.sort(sortBy);
    } else {
      toyQuery = toyQuery.sort("-createdAt");
    }

    // GET TOTAL COUNT MATCHING THE QUERY
    const total = await Toy.countDocuments(toyQuery);
    logger.info(`Total toys: ${total}`);

    // PAGINATION
    const page = Number(query["page"]) || PAGINATION.page;
    const limit = Number(query["limit"]) || PAGINATION.limit;
    const skip = (page - 1) * limit;

    const toys = await toyQuery.skip(skip).limit(limit);

    if (!toys.length) {
      logger.info("No toys found");
      return { toys: [], total, page, limit };
    }

    logger.info(`Toys fetched successfully: ${toys.length}`);
    return { toys, total, page, limit };
  } catch (err) {
    logger.error(`Error fetching toys: ${(err as Error).message}`);
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
