export type Toy = {
  category: string[];
  description: string;
  _id: string;
  images: string[];
  name: string;
  price: number;
  status: "available" | "exchanged";
  tokenValue: number;
  condition: string;
  origin: string;
  quantity: number;
  fullDescription: string;
};

export type ToyState = {
  toys: Toy[];
};
