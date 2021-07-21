import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default: "https://picsum.photos/70/70",
    },
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);
