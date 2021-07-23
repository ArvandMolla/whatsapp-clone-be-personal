import express from "express";
import { userModel } from "../models/user.js";
import chatModel from "../models/chat.js";
import createError from "http-errors";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(createError(400, error));
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await userModel.findById(req.params.id);
    if (data) {
      res.send(data);
    } else {
      next(createError(404, "user not found!"));
    }
  } catch (error) {
    next(createError(500, "fetching requested user failed!"));
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    console.log(req.query);
    const data = await userModel.find({ userName: req.query.q });
    if (data) {
      res.send(data);
    } else {
      res.send([]);
    }
  } catch (error) {}
});

userRouter.post("/me/chats", async (req, res, next) => {
  try {
    const myId = req.body.myId;
    const data = await chatModel.find({ members: myId }).populate("members");
    res.send(data);
  } catch (error) {
    next(createError(500, "fetching requested chats failed!"));
  }
});

export default userRouter;
