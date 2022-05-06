import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import bikeRoutes from "./routes/bikeRouter.js";
// import reservationRoutes from "./routes/reservationRouter.js";
import userRouter from "./routes/userRoutes.js.js";
import pathConstants from "../pathConstants.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(`/${pathConstants.BIKES}`, bikeRoutes);
app.use(`/${pathConstants.USER}`, userRouter);
// app.use(`/${pathConstants.RESERVATIONS}`, reservationRoutes);
app.get("/", (req, res) => res.send("Hello to RENT A BIKE API"));
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));
