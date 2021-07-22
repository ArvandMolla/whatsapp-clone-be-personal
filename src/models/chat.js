import mongoose from "mongoose";
import messageSchema from "./message.js";

const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    members: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "User",
      default: [],
    },
    messageHistory: { type: [messageSchema], required: true, default: [] },
  },
  { timestamps: true }
);

export default model("Chat", chatSchema);
