import express, { request } from "express";
import chatModel from "../models/chat.js";
import q2m from "query-to-mongo";
import createError from "http-errors";

const chatRouter = express.Router();

chatRouter.post("/", async (req, res, next) => {
  try {
    const newChat = new chatModel(req.body);
    const createdChat = await newChat.save();
    res.status(201).send(createdChat);
  } catch (error) {
    next(createError(400, error));
  }
});

chatRouter.get("/:id/messages", async (req, res, next) => {
  try {
    const data = await chatModel.findById(req.params.id);
    if (data) {
      res.send(data.messageHistory);
    } else {
      next(createError(404, "chat id not found!"));
    }
  } catch (error) {
    next(createError(500, "fetching the chat failed!"));
  }
});

chatRouter.put("/:id/new-message", async (req, res, next) => {
  try {
    const chat = await chatModel.findById(req.params.id);
    let messages = chat.messageHistory;
    messages.push(req.body);
    const newChatObj = {
      members: chat.members,
      messageHistory: messages,
    };

    const newChat = await chatModel.findByIdAndUpdate(
      req.params.id,
      newChatObj,
      { new: true }
    );
    res.send(newChat);
  } catch (error) {
    next(createError(500, "fetching the chat failed!"));
  }
});

export default chatRouter;
