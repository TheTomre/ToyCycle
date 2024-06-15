export interface Toy {
  category: string[];
  description: string;
  id: string;
  images: string[];
  name: string;
  price: number;
  status: "available" | "exchanged" | "hold";
  tokenValue: number;
}
