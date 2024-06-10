import { Toy } from "./toys";

export type User = {
  auth0Id: string;
  avatar?: string;
  bio?: string;
  email: string;
  firstName?: string;
  lastActive: Date;
  lastName?: string;
  password?: string;
  tokenBalance: number;
  toyListings: Toy[];
  city: string;
  country: string;
  street1: string;
  street2?: string;
  zipcode: string;
};

export type UserUpdateBioDTO = Pick<User, "bio" | "lastName" | "firstName">;

export type UserInputDTO = Omit<User, "id">;
