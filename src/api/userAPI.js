import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.send("user router works!");
});

export default userRouter;
