import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import requestRoutes from "./routes/requestRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// TEMPORARY: allow all origins for Render testing
const allowedOrigins = ["*"];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH"],
  },
});

// Middleware
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Test Route (Render needs this!)
app.get("/", (req, res) => {
  res.send("Backend is running ✔️");
});

// API Routes
app.use("/api/requests", requestRoutes(io));
app.use("/api/donations", donationRoutes(io));
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Socket.io Events
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
