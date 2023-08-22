import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { prisma } from "./lib/prisma";
import { z } from "zod";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", async (data) => {
    const messageBody = z.object({
      author: z.string(),
      text: z.string(),
    });

    const message = messageBody.parse(data);

    await prisma.message.create({
      data: message,
    });

    socket.broadcast.emit("receive_message");
    socket.emit("receive_message");
  });
});

app.get("/message", async (req, res) => {
  const data = await prisma.message.findMany();

  res.send(data);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
