import productModel from "./Models/product.models.js"; // Assuming you named your schema file Product.js
import { catModel } from "./Models/category.models.js";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { userModel } from "./Models/user.models.js";

const router = express.Router();
cloudinary.config({
  cloud_name: "dr1orjiil",
  api_key: "211753862327125",
  api_secret: "VVPjbAQrR-NLYJgVvPv0cFQ1So8",
});
router.get("/getPassword", async (req, res) => {
  try {
    const user = req.query.user;
    const password = req.query.password;
    console.error("user", user);
    const userData = await userModel.findOne({ user });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    if (password === userData.password) {
      return res.json({ success: true, message: "password matched " });
    } else {
      return res.json({ success: false, message: "Password not matched" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get password" });
  }
});

router.post("/registerUser", async (req, res) => {
  try {
    const { user, email, password } = req.body;
    const userData = new userModel({ user, email, password });
    await userData.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "User registration failed" });
  }
});

//save and update
router.post("/items", async (req, res) => {
  let datatoSend = "";
  try {
    if (req.body._id) {
      const {
        _id,
        name,
        description,
        productimage,
        price,
        stock,
        category,
        owner,
      } = req.body;
      datatoSend = await productModel.findByIdAndUpdate(_id, {
        name,
        description,
        productimage,
        price,
        stock,
        category,
        owner,
      });

      if (!datatoSend) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
    } else {
      const { name, description, productimage, price, stock, category, owner } =
        req.body;
      datatoSend = new productModel({
        name,
        description,
        productimage,
        price,
        stock,
        category,
        owner,
      });

      await datatoSend.save();
    }

    res.json({ success: true, datatoSend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
//Delete Item
router.post("/deleteitem", async (req, res) => {
  try {
    const { deleteId } = req.body;
    await productModel.findByIdAndDelete(deleteId);
    res.json({ success: true, message: "Deleted Successfully!!" });
  } catch (error) {
    res.status(500).json({ success: true, message: "Server error" });
  }
});

//set category in dropdown
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

//get list of category in Dropdown
router.get("/getCategory", async (req, res) => {
  try {
    const categories = await catModel.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.log("problem in fetching from server", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//get category name from id
router.post("/getCategoryName", async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({ error: "categoryId is required" });
    }

    // Assuming your Category model has a schema like { _id: ObjectId, categoryName: String }
    const category = await catModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ categoryName: category.name });
  } catch (error) {
    console.error("Error in fetching category data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all data from database
router.get("/getDbData", async (req, res) => {
  try {
    const dbData = await productModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: dbData });
  } catch (error) {
    console.log("problem in fetching from server", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
