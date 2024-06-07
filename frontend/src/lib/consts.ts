export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"];

export const NAV: { [key: string]: string } = {
  home: "/",
  toys: "/toys",
  users: "/users",
  about: "/about",
  contactus: "/contactus"
};

export const ENDPOINT = {
  users: "/users",
  userEdit: "/users/edit",
  toys: "/toys",
  toysEdit: "/toys/edit",
  me: "/users/me"
};
