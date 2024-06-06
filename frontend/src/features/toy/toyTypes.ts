export type Toy = {
  category: string[];
  description: string;
  id: string;
  images: string[];
  name: string;
  price: number;
  status: "available" | "exchanged";
  tokenValue: number;
};

export type ToyState = {
  toys: Toy[];
};
