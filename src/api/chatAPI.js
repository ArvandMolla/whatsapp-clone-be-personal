import express from "express";

const chatRouter = express.Router();

chatRouter.get("/", (req, res, next) => {
  res.send("chat router works!");
});

export default chatRouter;
