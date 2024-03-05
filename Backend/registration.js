import productModel from "./Models/product.models.js"; // Assuming you named your schema file Product.js
import { catModel } from "./Models/category.models.js";
import express from "express";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();
cloudinary.config({
  cloud_name: "dr1orjiil",
  api_key: "211753862327125",
  api_secret: "VVPjbAQrR-NLYJgVvPv0cFQ1So8",
});

router.post("/items", async (req, res) => {
  try {
    const { name, description, productimage, price, stock, category, owner } =
      req.body;
    const datatoSend = new productModel({
      name,
      description,
      productimage,
      price,
      stock,
      category,
      // owner,
    });
    console.log(productimage);
    await datatoSend.save();
    res.json({ success: true, datatoSend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/setCategory", async (req, res) => {
  try {
    const { name } = req.body;
    const datatoSend = new catModel({ name });
    await datatoSend.save();
    res.json({ success: true, data: datatoSend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "server error" });
  }
});

router.get("/getCategory", async (req, res) => {
  try {
    const categories = await catModel.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.log("problem in fetching from server", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
