import express from "express";
import { createRequest, getRequests } from "../controllers/requestController.js";

const router = express.Router();

export default (io) => {
  // Create a new request
  router.post("/", async (req, res) => {
    try {
      const request = await createRequest(req, res);

      // Notify connected clients (real-time updates)
      io.emit("new_request", request);
    } catch (err) {
      console.error(err);
    }
  });

  // Get all requests
  router.get("/", getRequests);

  return router;
};
