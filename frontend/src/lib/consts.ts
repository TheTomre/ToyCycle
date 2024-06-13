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
  me: "/users/me",
  userEdit: "/users/edit",
  toys: "/toys",
  toysMe: "/toys/me",
  toysEdit: "/toys/edit"
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
    filterForApi: "Books"
  },
  {
    id: 2,
    title: "Wooden Toys",
    filterForApi: "Wooden Toys"
  },
  {
    id: 3,
    title: "Cars | Trains",
    filterForApi: "Cars | Trains"
  },
  {
    id: 4,
    title: "Dolls | Playsets",
    filterForApi: "Dolls | Playsets"
  },
  {
    id: 5,
    title: "Pazzles and Games",
    filterForApi: "Pazzles and Games"
  },
  {
    id: 6,
    title: "Soft Toys",
    filterForApi: "Soft Toys"
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
