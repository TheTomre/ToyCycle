import mongoose, { Document, Schema } from "mongoose";

const ageCategories = [
  "0-3 months",
  "3-6 months",
  "6-9 months",
  "9-12 months",
  "1-2 years",
  "2-3 years",
  "3-4 years",
  "4-6 years"
];

const brands = [
  "Lego",
  "Mattel",
  "Hasbro",
  "Fisher-Price",
  "Playmobil",
  "VTech",
  "Bandai",
  "Hot Wheels",
  "Barbie",
  "Nerf"
];

const ToySchema: Schema = new Schema(
  {
    ageCategory: { type: [String], enum: ageCategories, required: true },
    brand: { type: String, enum: brands, required: true },
    description: { required: true, type: String },
    images: { default: [], type: [String] },
    name: { required: true, type: String },
    price: { min: 0, required: true, type: Number },
    status: {
      default: "available",
      enum: ["available", "exchanged"],
      type: String
    },
    tokenValue: { default: 0, type: Number },
    condition: { required: true, type: String },
    origin: { required: true, type: String },
    quantity: { required: true, type: Number },
    fullDescription: { required: true, type: String }
  },
  { timestamps: true }
);

export type ToyType = Document & {
  ageCategory: string[];
  brand: string;
  description: string;
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

export type PartialToyType = Partial<ToyType>;

export default mongoose.model<ToyType>("Toy", ToySchema);
