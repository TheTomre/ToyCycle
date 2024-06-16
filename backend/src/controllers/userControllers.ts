import { NextFunction, Request, Response } from "express";

import { STATUS, STATUS_MESSAGE } from "../consts/statusCodes";
import usersServices from "../services/userServices";

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await usersServices.createUser(req);
    if (!newUser) {
      return res.status(STATUS.BAD_REQUEST).json({
        status: STATUS_MESSAGE.FAIL,
        message: "User not created"
      });
    }
    return res.status(STATUS.CREATED).json({
      status: STATUS_MESSAGE.SUCCESS,
      data: newUser
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await usersServices.fetchCurrentUser(req);
    if (!currentUser) {
      return res.status(STATUS.NOT_FOUND).json({
        status: STATUS_MESSAGE.FAIL,
        message: "User not found"
      });
    }
    return res.status(STATUS.OK).json({
      status: STATUS_MESSAGE.SUCCESS,
      data: currentUser
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params["id"]) {
    return res.status(STATUS.BAD_REQUEST).json({
      status: STATUS_MESSAGE.FAIL,
      message: "Please provide a user id"
    });
  }

  try {
    const user = await usersServices.fetchUserById(req.params["id"]);
    if (!user) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ status: STATUS_MESSAGE.FAIL, message: "User not found" });
    }

    return res.status(STATUS.OK).json({
      status: STATUS_MESSAGE.SUCCESS,
      data: user
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersServices.fetchAllUsers(req);

    if (!users?.length)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "No users found", status: STATUS_MESSAGE.FAIL });

    return res.status(STATUS.OK).json({
      data: users,
      status: STATUS_MESSAGE.SUCCESS
    });
  } catch (err) {
    next(err);
    return undefined;
  }
};

const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.userId)
    return res.status(STATUS.BAD_REQUEST).json({
      status: STATUS_MESSAGE.FAIL,
      message: "Please provide a correct user id"
    });

  try {
    const updatedUser = await usersServices.updateCurrentUserData(req);
    if (!updatedUser) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ status: STATUS_MESSAGE.FAIL, message: "User not found" });
    }

    return res.status(STATUS.OK).json({
      status: STATUS_MESSAGE.SUCCESS,
      data: updatedUser
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
      status: STATUS_MESSAGE.FAIL,
      message: "Please provide a correct user id"
    });

  try {
    const updatedUser = await usersServices.updateUserById(
      req.params["id"],
      req.body
    );
    if (!updatedUser) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ status: STATUS_MESSAGE.FAIL, message: "User not found" });
    }

    return res.status(STATUS.OK).json({
      status: STATUS_MESSAGE.SUCCESS,
      data: updatedUser
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
      status: STATUS_MESSAGE.FAIL,
      message: "Please provide a user id"
    });

  try {
    const deletedUser = await usersServices.deleteUserById(req.params["id"]);
    if (!deletedUser) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ status: STATUS_MESSAGE.FAIL, message: "User not found" });
    }

    return res.status(STATUS.NO_CONTENT).json({});
  } catch (err) {
    next(err);
    return undefined;
  }
};

const getUserToys = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req;

  try {
    const toys = await usersServices.fetchUserToys(userId);
    if (!toys.length) {
      return res.status(STATUS.NOT_FOUND).json({
        status: STATUS_MESSAGE.FAIL,
        message: "No toys found for the user"
      });
    }
    return res.status(STATUS.OK).json({
      status: STATUS_MESSAGE.SUCCESS,
      data: toys
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
  updateUserById,
  getCurrentUser,
  updateCurrentUser,
  getUserToys
};
