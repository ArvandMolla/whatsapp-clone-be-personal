import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export default messageSchema;
