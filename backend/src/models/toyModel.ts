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
const categories = [
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
    category: { type: [String], enum: categories, required: true },
    brand: { type: String, enum: brands, required: true },
    description: { required: true, type: String },
    // images: { default: [], type: [String] },
    images: { type: String },
    name: { required: true, type: String },
    price: { min: 0, required: true, type: Number },
    status: {
      default: "available",
      enum: ["available", "exchanged", "hold"],
      type: String
    },
    condition: {
      default: "available",
      enum: ["new", "good", "bad", "broken"],
      type: String
    },
    tokenValue: { default: 0, type: Number },
    origin: { type: String },
    quantity: { required: true, type: Number },
    fullDescription: { required: true, type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export type ToyType = Document & {
  ageCategory: string[];
  brand: string;
  description: string;
  // images: string[];
  images: string;
  name: string;
  price: number;
  status: "available" | "exchanged" | "hold";
  tokenValue: number;
  condition: string;
  origin?: string;
  quantity: number;
  fullDescription: string;
  user: mongoose.Types.ObjectId;
};

export type PartialToyType = Partial<ToyType>;

export default mongoose.model<ToyType>("Toy", ToySchema);
