import { UserInputDTO, User as UserType } from "../types/user";
import User from "./models/user-model";
import logger from "../logger/logger";

const createUser = async (data: UserInputDTO) => {
  try {
    const newUser = await User.create(data);
    await newUser.save();
    logger.info(`User ${newUser.email} created`);
    if (!newUser.id) return undefined;
    return newUser;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const fetchUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user?.id) return undefined;
    logger.info(`User ${user.email} fetched successfully`);
    return user;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const fetchAllUsers = async () => {
  try {
    const users = await User.find({});
    if (users.length === 0) return undefined;
    logger.info("Users fetched successfully");
    return users;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const updateUserById = async <T extends UserType>(id: string, userData: T) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) return undefined;
    logger.info(`User ${updatedUser.email} updated successfully`);
    return updatedUser;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const addUserAvatar = async (id: string, avatar: string) => {
  try {
    const user = await User.findById(id);
    if (!user) return undefined;
    user.avatar = avatar;
    await user.save();
    logger.info(`Avatar added to user ${user.email}`);
    return user;
  } catch (err) {
    throw new Error((err as Error).message);
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
    throw new Error((err as Error).message);
  }
};

const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return undefined;
    logger.info(`User ${deletedUser.email} deleted successfully`);
    return deletedUser;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default {
  addUserAvatar,
  createUser,
  deleteUserAvatar,
  deleteUserById,
  fetchAllUsers,
  fetchUserById,
  updateUserById
};
