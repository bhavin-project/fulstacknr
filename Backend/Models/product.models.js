import mongoose from "mongoose";
import connectDB from "../db.js";

connectDB();

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productimage: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cateUser",
      required: true,
    },
    owner: {
      type: String,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("productUser", productSchema);

export default productModel;
