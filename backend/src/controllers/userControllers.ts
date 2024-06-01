import { NextFunction, Request, Response } from "express";
import { STATUS, STATUS_MESSAGE } from "../consts/status-codes";
import User from "../models/userModel";
import logger from "../logger/logger";
import { PAGINATION } from "../consts/pagination";

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await User.create(req.body);
    await newUser.save();
    logger.info(`User ${newUser.email} created`);

    if (!newUser)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "User not created",
        status: STATUS_MESSAGE.FAIL
      });

    return res.status(STATUS.SUCCESS_201).json({
      data: newUser,
      status: STATUS_MESSAGE.SUCCESS
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params["id"])
    return res.status(STATUS.BAD_REQUEST).json({
      message: "Please provide a user id",
      status: STATUS_MESSAGE.FAIL
    });

  try {
    const user = await User.findById(req.params["id"]);
    if (!user)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "User not found", status: STATUS_MESSAGE.FAIL });

    logger.info(`User ${user.email} fetched successfully`);

    return res.status(STATUS.SUCCESS).json({
      data: user,
      status: STATUS_MESSAGE.SUCCESS
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      limit = PAGINATION.limit,
      page = PAGINATION.page,
      sort = PAGINATION.sort
    } = req.query;

    const sortOrder =
      sort === "asc" || sort === "desc" ? sort : PAGINATION.sort;

    const sortOrderValue = sortOrder === "asc" ? 1 : -1;

    const users = await User.find({})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ name: sortOrderValue });

    if (!users?.length)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "No users found", status: STATUS_MESSAGE.FAIL });

    logger.info(`Users fetched successfully ${users}`);
    return res.status(STATUS.SUCCESS).json({
      data: users,
      status: STATUS_MESSAGE.SUCCESS
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params["id"])
    return res.status(STATUS.BAD_REQUEST).json({
      message: "Please provide a user id",
      status: STATUS_MESSAGE.FAIL
    });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params["id"],
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!updatedUser)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "User not found", status: STATUS_MESSAGE.FAIL });

    logger.info(`User ${updatedUser.email} updated successfully`);

    return res.status(STATUS.SUCCESS_201).json({
      data: updatedUser,
      status: STATUS_MESSAGE.SUCCESS
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params["id"])
    return res.status(STATUS.BAD_REQUEST).json({
      message: "Please provide a user id",
      status: STATUS_MESSAGE.FAIL
    });

  try {
    const deletedUser = await User.findByIdAndDelete(req.params["id"]);
    if (!deletedUser)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "User not found", status: STATUS_MESSAGE.FAIL });

    logger.info(`User ${deletedUser.email} deleted successfully`);
    return res.status(STATUS.SUCCESS_204).json({
      status: STATUS_MESSAGE.SUCCESS
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

// const addUserAvatar = async (id: string, avatar: string) => {
//   try {
//     const user = await User.findById(id);
//     if (!user) return undefined;
//     user.avatar = avatar;
//     await user.save();
//     logger.info(`Avatar added to user ${user.email}`);
//     return user;
//   } catch (err) {
//     throw new Error((err as Error).message);
//   }
// };

// const deleteUserAvatar = async (id: string) => {
//   try {
//     const user = await User.findById(id);
//     if (!user) return undefined;
//     user.avatar = "";
//     await user.save();
//     logger.info(`Avatar deleted from user ${user.email}`);
//     return user;
//   } catch (err) {
//     throw new Error((err as Error).message);
//   }
// };

export default {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById
};
