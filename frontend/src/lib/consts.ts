export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"];

export const NAV: { [key: string]: string } = {
  home: "/",
  toys: "/toys",
  users: "/users",
  about: "/about",
  contactus: "/contactus"
};

export const NAV_ITEMS = Object.keys(NAV);

export const ENDPOINT = {
  users: "/users",
  userEdit: "/users/edit",
  toys: "/toys",
  toysEdit: "/toys/edit",
  me: "/users/me"
};

export const CATEGORIES_AGE = [
  {
    id: 1,
    title: "0-3 mounts",
    filterForApi: ""
  },
  {
    id: 2,
    title: "3-6 mounts",
    filterForApi: ""
  },
  {
    id: 3,
    title: "6-9 mounts",
    filterForApi: ""
  },
  {
    id: 4,
    title: "9-12 mounts",
    filterForApi: ""
  },
  {
    id: 5,
    title: "1-2 years",
    filterForApi: ""
  },
  {
    id: 6,
    title: "2-3 years",
    filterForApi: ""
  },
  {
    id: 7,
    title: "3-4 years",
    filterForApi: ""
  },
  {
    id: 8,
    title: "4-6 years",
    filterForApi: ""
  }
];

export const CATEGORIES_TYPE = [
  {
    id: 1,
    title: "Books",
    filterForApi: ""
  },
  {
    id: 2,
    title: "Wooden Toys",
    filterForApi: ""
  },
  {
    id: 3,
    title: "Cars | Trains",
    filterForApi: ""
  },
  {
    id: 4,
    title: "Dolls | Playsets",
    filterForApi: ""
  },
  {
    id: 5,
    title: "Pazzles and Games",
    filterForApi: ""
  },
  {
    id: 6,
    title: "Soft Toys",
    filterForApi: ""
  }
];
