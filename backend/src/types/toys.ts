export type AgeCategory =
  | "0-3 months"
  | "3-6 months"
  | "6-9 months"
  | "9-12 months"
  | "1-2 years"
  | "2-3 years"
  | "3-4 years"
  | "4-6 years";

export type Brand =
  | "Lego"
  | "Mattel"
  | "Hasbro"
  | "Fisher-Price"
  | "Playmobil"
  | "VTech"
  | "Bandai"
  | "Hot Wheels"
  | "Barbie"
  | "Nerf";

export type Category =
  | "stuffed"
  | "toy"
  | "electronic"
  | "building"
  | "educational"
  | "outdoor"
  | "creative"
  | "musical"
  | "puzzle"
  | "vehicle"
  | "construction";

export type ToySuccessResponse = {
  data: Toy;
  status: string;
};

export type Toy = {
  _id: string;
  ageCategory: AgeCategory[];
  brand: string;
  category: Category[];
  description: string;
  images: string[];
  name: string;
  price: number;
  status: "available" | "exchanged" | "hold";
  tokenValue: number;
  condition: string;
  origin: string;
  quantity: number;
  fullDescription: string;
  user: string;
  lastUpadated: Date;
};

export type ToysState = {
  toys: Toy[];
  selectedToy: Toy | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  loading: boolean;
};
