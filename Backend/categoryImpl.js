import { catModel } from "./Models/category.models.js";
import express, { Router } from "express";

const router = Router();

router.post("/category", async (req, res) => {
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

// export default router;
