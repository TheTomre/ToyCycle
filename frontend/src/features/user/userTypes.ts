import { Toy } from "../toy/toyTypes";

export type UserState = {
  email: string;
};

export type User = {
  city?: string;
  country?: string;
  street1?: string;
  street2?: string;
  zipcode: string;
  avatar?: string;
  bio?: string;
  email: string;
  firstName?: string;
  auth0Id: string;
  lastActive: string;
  lastName?: string;
  password?: string;
  tokenBalance: number;
  toyListings: Toy[];
};

export type UserUpdateBioDTO = Pick<User, "bio" | "lastName" | "firstName">;

export type UserInputDTO = Omit<User, "id">;
