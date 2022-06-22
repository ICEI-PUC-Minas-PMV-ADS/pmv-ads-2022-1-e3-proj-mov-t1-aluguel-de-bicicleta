import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import secretString from "../middleware/constants.js";
import UserModel from "../models/userModel.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) return res.status(404).json("User doesnt exist");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) return res.status(400).json("Invalid Credentials");

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        isManager: existingUser.isManager,
      },
      secretString,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function signup(req, res) {
  const { email, password, firstName, lastName, isManager } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (password.length < 8) return res.status(500).json("password to short");
    if (existingUser) return res.status(400).json("User already exist");
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isManager,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id, isManager: newUser.isManager },
      secretString,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ result: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await UserModel.aggregate([
      { $addFields: { userId: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "reservations",
          localField: "userId",
          foreignField: "userId",
          as: "reservations",
        },
      },
      { $sort: { firstName: 1, lastName: 1, email: 1 } },
    ]);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

export async function getUser(req, res) {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  try {
    const user = await UserModel.findById(_id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  const { email, password, firstName, lastName, isManager, userId } = req.body;
  try {
    if (password && password.length < 8) {
      return res.status(500).json("password to short");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send("No user with that id");
    }
    const existingUser = await UserModel.findOne({ email });

    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json("Email already exist for another user");
    }

    const user = await UserModel.findOne({ _id: userId });

    let hashedPassword = user.password;
    if (password) hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isManager,
    };
    const updateResponse = await UserModel.findByIdAndUpdate(
      userId,
      { ...updatedUser, _id: userId },
      { new: true }
    );

    return res.json(updateResponse);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteUser(req, res) {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  await UserModel.findByIdAndRemove(_id);

  return res.json("User deleted successfuly");
}
