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

export type Toy = {
  ageCategory: AgeCategory[];
  brand: string;
  category: Category[];
  description: string;
  _id: string;
  images: string[];
  name: string;
  price: number;
  status: "available" | "exchanged" | "hold";
  tokenValue: number;
  condition: string;
  origin: string;
  quantity: number;
  fullDescription: string;
  ownerId: string;
};

export type ToysState = {
  toys: Toy[];
  relatedToys: Toy[];
  selectedToy: Toy | null;
  error: string | null;
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  loading: boolean;
  ageCategory: string[];
  brand: string[];
  category: string[];
  search: string;
  sort: string;
};

export type ToySuccessResponse = {
  status: string;
  data: Toy;
};
