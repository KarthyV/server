import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

mongoose
  .connect(URL, { useNewUrlParser: true })
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
