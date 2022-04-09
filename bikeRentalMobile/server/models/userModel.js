import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isManager: { type: Boolean, default: false },
  reservations: { type: [String], default: [] },
  id: { type: String },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
