import express from "express";
import chatRouter from "./chatAPI.js";
import userRouter from "./userAPI.js";

const allRouters = express.Router();

allRouters.use("/user", userRouter);
allRouters.use("/chat", chatRouter);

export default allRouters;
