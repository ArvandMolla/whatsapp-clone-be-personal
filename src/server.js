import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import allRouters from "./api/index.js";
import mongoose from "mongoose";
import { errorHandler } from "./utilities/errorHandler.js";

//this is meeeee
const app = express();

const whiteList = [
  process.env.FRONTEND_DEV_URL,
  process.env.FRONTEND_CLOUD_URL,
];
const corsOptions = {
  origin: function (origin, next) {
    console.log("ORIGIN ", origin);
    if (whiteList.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("CORS TROUBLES!!!!!"));
    }
  },
};

// middlewares ***********************
app.use(express.json());
app.use(cors(corsOptions));
// routers ****************************
app.use("/api", allRouters);
// errorHandlers **********************
app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected with socket id: ", socket.id);

  socket.on("new chat", (arg) => {
    socket.join(arg);
    console.log("a user joined room: ", arg);
  });

  socket.on("send message", (arg) => {
    console.log(" new message for room: ", arg);
    socket.to(arg).emit("new message", arg);
  });
});

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("✅✅✅ Running on port", port);
    })
  )
  .catch((err) => console.log(err));
