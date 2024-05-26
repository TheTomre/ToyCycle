export interface Toy {
  category: string[];
  description: string;
  id: string;
  images: string[];
  name: string;
  status: "available" | "exchanged";
  tokenValue: number;
}
