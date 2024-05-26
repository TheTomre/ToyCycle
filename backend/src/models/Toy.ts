import mongoose, { Document, Schema } from "mongoose";

const ToySchema: Schema = new Schema({
  category: { required: true, type: [String] },
  description: { required: true, type: String },
  images: { default: [], type: [String] },
  name: { required: true, type: String },
  price: { required: true, type: Number },
  status: {
    default: "available",
    enum: ["available", "exchanged"],
    type: String
  },
  tokenValue: { default: 0, type: Number }
});

export default mongoose.model<ToyType>("Toy", ToySchema);

export type ToyType = Document & {
  category: string[];
  description: string;
  images: string[];
  name: string;
  price: number;
  status: "available" | "exchanged";
  tokenValue: number;
};
