import { Request } from "express";
import { User as UserType } from "../types/user";
import User from "../models/userModel";
import logger from "../logger/logger";
import { PAGINATION } from "../consts/pagination";
import { EXCLUDED_QUERY_FIELDS } from "../consts/queryFields";

const createUser = async (data: Request) => {
  try {
    const { auth0Id } = data.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) return existingUser;

    const newUser = await User.create(data.body);
    await newUser.save();
    logger.info(`User ${newUser.email} created`);
    return newUser;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const fetchCurrentUser = async (req: Request) => {
  try {
    const currentUser = await User.findById({ _id: req.userId });

    logger.info(`User ${currentUser?.email} fetched successfully`);
    return currentUser;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const fetchUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    logger.info(`User ${user?.email} fetched successfully`);
    return user;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const fetchAllUsers = async (req: Request) => {
  try {
    const queryObj = { ...req.query };

    // FILTERING
    const excludeFields = [...EXCLUDED_QUERY_FIELDS];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    // SORTING
    if (req.query["sort"]) {
      const sortBy = (req.query["sort"] as string).split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // FIELD LIMITING
    if (req.query["fields"]) {
      const fields = (req.query["fields"] as string).split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // PAGINATION
    const page = Number(req.query["page"]) || PAGINATION.page;
    const limit = Number(req.query["limit"]) || PAGINATION.limit;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const users = await query
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (!users?.length) return undefined;

    logger.info(`Users fetched successfully ${users}`);
    return users;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const updateUserById = async <T extends UserType>(id: string, userData: T) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true
    });
    logger.info(`User ${updatedUser?.email} updated successfully`);
    return updatedUser;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const updateCurrentUserData = async (req: Request) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
      runValidators: true
    });
    logger.info(`User ${updatedUser?.email} updated successfully`);
    return updatedUser;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const addUserAvatar = async (id: string, avatar: string) => {
  try {
    const user = await User.findById(id);
    if (!user) return null;
    user.avatar = avatar;
    await user.save();
    logger.info(`Avatar added to user ${user.email}`);
    return user;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const deleteUserAvatar = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) return undefined;
    user.avatar = "";
    await user.save();
    logger.info(`Avatar deleted from user ${user.email}`);
    return user;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    logger.info(`User ${deletedUser?.email} deleted successfully`);
    return deletedUser;
  } catch (err) {
    logger.error((err as Error).message);
    return null;
  }
};

export default {
  addUserAvatar,
  createUser,
  deleteUserAvatar,
  deleteUserById,
  fetchAllUsers,
  fetchUserById,
  fetchCurrentUser,
  updateCurrentUserData,
  updateUserById
};
