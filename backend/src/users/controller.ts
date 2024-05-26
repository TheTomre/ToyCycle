/* eslint-disable @typescript-eslint/explicit-function-return-type -- Posponed */

import { NextFunction, Request, Response } from "express";
import { STATUS } from "../consts/status-codes";
import userService from "./services";

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Posponed
    const newUser = await userService.createUser(req.body);
    if (!newUser)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "User not created",
        status: "fail"
      });

    return res.status(STATUS.SUCCESS_201).json({
      data: newUser,
      status: "success"
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
      status: "fail"
    });

  try {
    const user = await userService.fetchUserById(req.params["id"]);
    if (!user)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "User not found", status: "fail" });

    return res.status(STATUS.SUCCESS).json({
      data: user,
      status: "success"
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.fetchAllUsers();
    if (!users?.length)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "No users found", status: "fail" });
    return res.status(STATUS.SUCCESS).json({
      data: users,
      status: "success"
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
      status: "fail"
    });

  try {
    const updatedUser = await userService.updateUserById(
      req.params["id"],
      req.body
    );
    if (!updatedUser)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "User not found", status: "fail" });

    return res.status(STATUS.SUCCESS).json({
      data: updatedUser,
      status: "success"
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
      status: "fail"
    });

  try {
    const deletedUser = await userService.deleteUserById(req.params["id"]);
    if (!deletedUser)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "User not found", status: "fail" });

    return res.status(STATUS.SUCCESS).json({
      data: deletedUser,
      status: "success"
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

export default {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById
};
