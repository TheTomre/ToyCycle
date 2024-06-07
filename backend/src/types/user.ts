import { Toy } from "./toys";

export type User = {
  auth0Id: string;
  address?: Address;
  avatar?: string;
  bio?: string;
  email: string;
  firstName?: string;
  lastActive: Date;
  lastName?: string;
  password?: string;
  tokenBalance: number;
  toyListings: Toy[];
};

type Address = {
  city: string;
  country: string;
  street1: string;
  street2?: string;
  zipcode: string;
};

export type UserUpdateBioDTO = Pick<User, "bio" | "lastName" | "firstName">;
export type UserUpdateAddressDTO = Pick<User, "address">;

export type UserInputDTO = Omit<User, "id">;
