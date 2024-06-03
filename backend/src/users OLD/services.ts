import { UserInputDTO, User as UserType } from "../types/user";
import User from "../models/userModel";
import logger from "../logger/logger";

const createUser = async (data: UserInputDTO) => {
  try {
    const newUser = await User.create(data);
    await newUser.save();
    logger.info(`User ${newUser.email} created`);
    return newUser;
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

const fetchAllUsers = async () => {
  try {
    const users = await User.find({});
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
  updateUserById
};
