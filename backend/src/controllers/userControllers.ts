import { NextFunction, Request, Response } from "express";
import { STATUS, STATUS_MESSAGE } from "../consts/statusCodes";
import usersServices from "../services/usersServices";
// import { PAGINATION } from "../consts/pagination";
// import { QueryObj, ReqQuery } from "../types/queryTypes";
// import { EXCLUDED_QUERY_FIELDS } from "../consts/queryFields";

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await usersServices.createUser(req.body);
    if (!newUser) {
      return res.status(STATUS.BAD_REQUEST).json({
        status: STATUS_MESSAGE.FAIL,
        message: "User not created"
      });
    }
    await newUser.save();
    return res.status(STATUS.CREATED).json({
      status: STATUS_MESSAGE.SUCCESS,
      data: newUser
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

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await usersServices.fetchAllUsers();

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
// const getAllUsers = async (
//   req: Request<{}, {}, {}, ReqQuery>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // REMOVE FIELDS WHICH ARE NOT NECCESSARY
//     const queryObj: QueryObj = { ...req.query };
//     const excludeFields = [...EXCLUDED_QUERY_FIELDS];
//     excludeFields.forEach(el => delete queryObj[el]);

//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

//     let query = User.find(JSON.parse(queryStr));

//     // SORTING
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // FIELD LIMITING
//     if (req.query.fields) {
//       const fields = req.query.fields.split(",").join(" ");
//       query = query.select(fields);
//     } else {
//       query = query.select("-__v");
//     }

//     // PAGINATION
//     const page = Number(req.query.page) || PAGINATION.page;
//     const limit = Number(req.query.limit) || PAGINATION.limit;
//     const skip = (page - 1) * limit;

//     query = query.skip(skip).limit(limit);

//     if (req.query.page) {
//       const numUsers = await User.countDocuments();
//       if (skip >= numUsers) throw new Error("Page does not exist");
//     }

//     const users = await User.find({})
//       .skip((Number(page) - 1) * Number(limit))
//       .limit(Number(limit));

//     if (!users?.length)
//       return res
//         .status(STATUS.NOT_FOUND)
//         .json({ status: STATUS_MESSAGE.FAIL, message: "No users found" });

//     logger.info(`Users fetched successfully ${users}`);
//     return res.status(STATUS.OK).json({
//       status: STATUS_MESSAGE.SUCCESS,
//       data: users
//     });
//   } catch (err) {
//     next(err);
//     return undefined;
//   }
// };

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
