const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const port = 4000;

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "'https://pedopia.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "'https://pedopia.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room); 
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("sendMessage", (data) => {
    const { roomId, message, senderId, receiverId, timestamp } = data;
    console.log("Message:", message, "sent to room ID:", roomId, "by", senderId);

    io.to(roomId).emit("receiveMessage", { senderId, receiverId, message, timestamp });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
