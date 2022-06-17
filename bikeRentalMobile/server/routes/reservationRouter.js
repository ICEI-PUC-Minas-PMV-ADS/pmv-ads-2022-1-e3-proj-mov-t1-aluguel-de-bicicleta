import express from "express";
import {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getUserReservations,
} from "../controllers/reservationControllers.js";
import middlewareAuth from "../middleware/middlewareAuth.js";
import pathConstants from "../../src/pathConstants.js";

const reservationRouter = express.Router();

reservationRouter.get("/:id", getReservation);
reservationRouter.get("/", getReservations);
reservationRouter.get(`/${pathConstants.USER}/:id`, getUserReservations);
reservationRouter.post("/", middlewareAuth, createReservation);
reservationRouter.patch("/:id", middlewareAuth, updateReservation);
reservationRouter.delete("/:id", middlewareAuth, deleteReservation);

export default reservationRouter;
