import { AgeCategory, Brand, Category } from "../features/toy/toyTypes";

export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"];

export const NAV: { [key: string]: string } = {
  home: "/",
  toys: "/toys",
  users: "/users",
  about: "/about",
  contactus: "/contactus"
};

export const NAV_ITEMS = Object.keys(NAV);

export const LIMITS_PER_PAGE = [10, 20, 30, 40, 50];

export const SORT_RESULTS = {
  "price": "Price: Low to High",
  "-price": "Price: High to Low",
  "name": "Name: A to Z",
  "-name": "Name: Z to A"
};

export const ENDPOINT = {
  users: "/users",
  me: "/users/me",
  userEdit: "/users/edit",
  toys: "/toys",
  toysMe: "/toys/me",
  toysEdit: "/toys/edit"
};

export const CATEGORIES = [
  "stuffed",
  "toy",
  "electronic",
  "building",
  "educational",
  "outdoor",
  "creative",
  "musical",
  "puzzle",
  "vehicle",
  "construction"
];

type CategoryType<T> = {
  id: number;
  title: T;
  filterForApi: string;
};

export const CATEGORIES_AGE: CategoryType<AgeCategory>[] = [
  {
    id: 1,
    title: "0-3 months",
    filterForApi: "0-3 months"
  },
  {
    id: 2,
    title: "3-6 months",
    filterForApi: "3-6 months"
  },
  {
    id: 3,
    title: "6-9 months",
    filterForApi: "6-9 months"
  },
  {
    id: 4,
    title: "9-12 months",
    filterForApi: "9-12 months"
  },
  {
    id: 5,
    title: "1-2 years",
    filterForApi: "1-2 years"
  },
  {
    id: 6,
    title: "2-3 years",
    filterForApi: "2-3 years"
  },
  {
    id: 7,
    title: "3-4 years",
    filterForApi: "3-4years"
  },
  {
    id: 8,
    title: "4-6 years",
    filterForApi: "4-6 years"
  }
];

export const BRANDS: CategoryType<Brand>[] = [
  {
    id: 1,
    title: "Lego",
    filterForApi: "Lego"
  },
  {
    id: 2,
    title: "Mattel",
    filterForApi: "Mattel"
  },
  {
    id: 3,
    title: "Hasbro",
    filterForApi: "Hasbro"
  },
  {
    id: 4,
    title: "Fisher-Price",
    filterForApi: "Fisher-Price"
  },
  {
    id: 5,
    title: "Playmobil",
    filterForApi: "Playmobil"
  },
  {
    id: 6,
    title: "VTech",
    filterForApi: "VTech"
  },
  {
    id: 7,
    title: "Bandai",
    filterForApi: "Bandai"
  },
  {
    id: 8,
    title: "Hot Wheels",
    filterForApi: "Hot Wheels"
  },
  {
    id: 9,
    title: "Barbie",
    filterForApi: "Barbie"
  },
  {
    id: 10,
    title: "Nerf",
    filterForApi: "Nerf"
  }
];
export const CATEGORIES_TYPE: CategoryType<Category>[] = [
  {
    id: 1,
    title: "stuffed",
    filterForApi: "stuffed"
  },
  {
    id: 2,
    title: "toy",
    filterForApi: "toy"
  },
  {
    id: 3,
    title: "electronic",
    filterForApi: "electronic"
  },
  {
    id: 4,
    title: "building",
    filterForApi: "building"
  },
  {
    id: 5,
    title: "educational",
    filterForApi: "educational"
  },
  {
    id: 6,
    title: "outdoor",
    filterForApi: "outdoor"
  },
  {
    id: 7,
    title: "creative",
    filterForApi: "creative"
  },
  {
    id: 8,
    title: "musical",
    filterForApi: "musical"
  },
  {
    id: 9,
    title: "puzzle",
    filterForApi: "puzzle"
  },
  {
    id: 10,
    title: "vehicle",
    filterForApi: "vehicle"
  },
  {
    id: 11,
    title: "construction",
    filterForApi: "construction"
  }
];

export const CATEGORIES_BRAND = [
  {
    "id": 1,
    "title": "Lego",
    "filterForApi": "lego"
  },
  {
    "id": 2,
    "title": "Mattel",
    "filterForApi": "mattel"
  },
  {
    "id": 3,
    "title": "Hasbro",
    "filterForApi": "hasbro"
  },
  {
    "id": 4,
    "title": "Fisher-Price",
    "filterForApi": "fisher_price"
  },
  {
    "id": 5,
    "title": "Playmobil",
    "filterForApi": "playmobil"
  },
  {
    "id": 6,
    "title": "VTech",
    "filterForApi": "vtech"
  },
  {
    "id": 7,
    "title": "Bandai",
    "filterForApi": "bandai"
  },
  {
    "id": 8,
    "title": "Hot Wheels",
    "filterForApi": "hot_wheels"
  },
  {
    "id": 9,
    "title": "Barbie",
    "filterForApi": "barbie"
  },
  {
    "id": 10,
    "title": "Nerf",
    "filterForApi": "nerf"
  }
];

export const TOY_STATUS = ["available", "exchanged", "hold"];
export const CONDITION = ["new", "good", "bad", "broken"];
