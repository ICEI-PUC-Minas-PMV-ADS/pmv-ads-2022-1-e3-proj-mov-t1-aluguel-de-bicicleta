import mongoose from "mongoose";

const { Schema } = mongoose;

const bikeSchema = new Schema({
  model: { type: String, required: true },
  color: { type: String, required: true },
  location: { type: String, required: true },
  ratings: { type: [{ userId: String, rating: Number }], default: [] },
  isAvailable: Boolean,
  creator: String,
  createdAt: { type: Number, default: new Date().getTime() },
});

const BikeModel = mongoose.model("Bike", bikeSchema);

export default BikeModel;
