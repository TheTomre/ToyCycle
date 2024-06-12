import { Request } from "express";
import { PAGINATION } from "../consts/pagination";
import { EXCLUDED_QUERY_FIELDS } from "../consts/queryFields";
import Toy, { PartialToyType, ToyType } from "../models/toyModel";

import logger from "../logger/logger";

export const createToy = async (data: PartialToyType) => {
  try {
    const newToy = await Toy.create(data);
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
    const queryObj = { ...req.query };
    // FILTERING
    const excludeFields = [...EXCLUDED_QUERY_FIELDS];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    logger.info(`Query string ${queryStr}`);
    let query = Toy.find({});
    const category = (req.query["category"] as string) || "";
    const ageCategory = (req.query["ageCategory"] as string) || "";
    const brand = (req.query["brand"] as string) || "";

    if (ageCategory) {
      const ageCategoryArr = ageCategory
        .split(",")
        .map(categoryEl => new RegExp(categoryEl, "i"));
      query = query.find({ ageCategory: { $in: ageCategoryArr } });
    }
    if (category) {
      const caregoryArr = category
        .split(",")
        .map(categoryEl => new RegExp(categoryEl, "i"));
      query = query.find({ category: { $in: caregoryArr } });
    }
    if (brand) {
      const brandArr = category
        .split(",")
        .map(brandEl => new RegExp(brandEl, "i"));
      query = query.find({ category: { $in: brandArr } });
    }

    // FIELD LIMITING
    if (req.query["fields"]) {
      const fields = (req.query["fields"] as string).split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // SEARCHING;
    // if (req.query["search"]) {
    //   const search = (req.query["search"] as string) || "";
    //   logger.info(`Search query ${search}`);
    //   if (search) {
    //     const rearchRegex = new RegExp(search, "i");
    //     query = query.find({
    //       $or: [
    //         { name: rearchRegex },
    //         { description: rearchRegex },
    //         { brand: rearchRegex }
    //       ]
    //     });
    //   }
    // }

    // SORTING
    if (req.query["sort"]) {
      const sortBy = (req.query["sort"] as string).split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // GET TOTAL COUNT MATCHING THE QUERY
    const total = await Toy.countDocuments(query);
    logger.info(`Total toys ${total}`);
    // PAGINATION
    const page = Number(req.query["page"]) || PAGINATION.page;
    const limit = Number(req.query["limit"]) || PAGINATION.limit;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const toys = await query
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (!toys?.length) return undefined;

    logger.info(`Toys fetched successfully ${toys}`);
    return { toys, total, page, limit };
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
