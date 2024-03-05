import mongoose from "mongoose";

const cateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const catModel = mongoose.model("cateUser", cateSchema);
