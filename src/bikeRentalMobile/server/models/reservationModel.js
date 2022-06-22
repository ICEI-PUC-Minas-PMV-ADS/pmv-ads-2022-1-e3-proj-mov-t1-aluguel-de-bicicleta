import mongoose from "mongoose";

const { Schema } = mongoose;

const reservationSchema = new Schema({
  bikeId: { type: String, required: true },
  userId: { type: String, required: true },
  startTimestamp: { type: Number, required: true },
  endTimestamp: { type: Number, required: true },
  creator: String,
  createdAt: { type: Number, default: new Date().getTime() },
});

const ReservationModel = mongoose.model("Reservation", reservationSchema);

export default ReservationModel;
