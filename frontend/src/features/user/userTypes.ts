import { Toy } from "../toy/toyTypes";

export type UserState = {
  email: string;
};

export type User = {
  address: Address;
  avatar?: string;
  bio: string;
  email: string;
  firstName: string;
  id: string;
  lastActive: Date;
  lastName: string;
  password: string;
  tokenBalance: number;
  toyListings: Toy[];
};

type Address = {
  city: string;
  country: string;
  street1: string;
  street2: string;
  zipcode: string;
};

export type UserUpdateBioDTO = Pick<User, "bio" | "lastName" | "firstName">;
export type UserUpdateAddressDTO = Pick<User, "address">;

export type UserInputDTO = Omit<User, "id">;
