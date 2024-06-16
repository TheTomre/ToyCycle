import { Toy } from "../toy/toyTypes";

export type UserState = {
  email: string;
};

export type User = {
  _id: string;
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
