import express from "express";
import pathConstants from "../../src/pathConstants.js";
import {
  createBike,
  getBikes,
  getBike,
  updateBike,
  deleteBike,
  getBikesByDates,
  rateBike,
} from "../controllers/bikeControllers.js";
import middlewareAuth from "../middleware/middlewareAuth.js";

const bikeRouter = express.Router();

bikeRouter.get("/:id", middlewareAuth, getBike);
bikeRouter.get("/", middlewareAuth, getBikes);
bikeRouter.get(
  `/${pathConstants.BIKES_BY_DATES}/:datesString`,
  getBikesByDates
);
bikeRouter.post("/", middlewareAuth, createBike);
bikeRouter.patch("/:id", middlewareAuth, updateBike);
bikeRouter.patch(`/:id/${pathConstants.RATING}`, middlewareAuth, rateBike);
bikeRouter.delete("/:id", middlewareAuth, deleteBike);

export default bikeRouter;
