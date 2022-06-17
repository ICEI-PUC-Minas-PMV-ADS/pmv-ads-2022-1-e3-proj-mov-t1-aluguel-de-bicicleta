import express from "express";
import pathConstants from "../../src/pathConstants.js";
import {
  getUser,
  getUsers,
  login,
  signup,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post(`/${pathConstants.LOGIN}`, login);
userRouter.post(`/${pathConstants.SIGNUP}`, signup);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
export default userRouter;
