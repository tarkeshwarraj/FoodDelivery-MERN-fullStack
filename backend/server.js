import express from "express";

import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();

const PORT = 4000;
//middleware configuration

app.use(express.json());

app.use(cors());

//db connection from config folder
connectDB();

//api endpoints middleware
app.use("/api/food", foodRouter); //aap yaha par /food ka baad jitna bhi route aayga sab foodRouter mai jayga
//api for image view from upload folder
app.use("/images", express.static("uploads"));
// app.use("/images", express.static(path.join(__dirname, "uploads")));

//middleware for ordering
app.use("/api/order", orderRouter); //

//For User Routes
app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
