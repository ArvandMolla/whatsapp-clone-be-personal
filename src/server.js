import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import allRouters from "./api/index.js";

const app = express();

app.use(express.json());
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
app.use(cors(corsOptions));

app.use("/api", allRouters);

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected with socket id: ", socket.id);
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log("server is listening on port: ", port);
});
