const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
const ENV = require("dotenv");
const socket = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(cookie());
ENV.config();

const connectedDB = require("./config/connectedDb");
connectedDB();

const routerAuth = require("./routers/auth.router");
const routerConversation = require("./routers/conversation.router");
const routerMessage = require("./routers/message.router");
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/conversation", routerConversation);
app.use("/api/v1/message", routerMessage);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Backend-start");
});

//SOCKET IO

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join room", (room) => {
    socket.join(room);
    // console.log(`User join roomId: ${room}`);
  });

  //CREATE CHAT
  socket.on("create chat", (room) => {
    io.emit("get group", room);
  });

  //
  socket.on("change members", (room) => {
    socket.to(room._id).emit("get members", room.members);
  });

  socket.on("new message", (newMessage) => {
    socket.broadcast.to(newMessage.conversation).emit("getMessage", newMessage);
  });
});
