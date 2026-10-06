import mongoose, { Schema } from "mongoose";
import { BookingEnums } from "../../common/index.js";

const bookingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bookingData: {
      type: Date,
    },
    status: {
      type: String,
      dafault: BookingEnums.pending,
      enum: BookingEnums,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

export const bookingModel = mongoose.model("booking", bookingSchema);
