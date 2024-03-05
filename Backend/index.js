// import productModel from "./Models/product.models.js"; // Assuming you named your schema file Product.js
// import app from "./server.js";

import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import registrationRoutes from "./registration.js";
// import categoryRoutes from "./categoryImpl.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);

app.use("/api", registrationRoutes);
// app.use("/api", categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
