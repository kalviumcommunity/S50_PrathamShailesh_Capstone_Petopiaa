const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const port = 4000;

const app = express();
const server = createServer(app);

// Apply CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Create Socket.IO server instance with CORS options
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on('joinRoom', (room) => {// Create a unique room ID based on sorted usernames
    socket.join(room); // Join the room
    console.log(room)
    console.log(`User ${socket.id} joined room ${room}`);
  });


  socket.on("sendMessage", (data) => {
    const { roomId, message,senderId } = data;
    console.log("message:", message,", sent to room ID:",roomId,"by",senderId);
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("receiveMessage",(resMess)=>{
    console.log("the message",resMess)
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
