import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

export default (io) => {
  // Create donation
  router.post("/", async (req, res) => {
    console.log("📥 Incoming Donation:", req.body);
    try {
      const donation = new Donation(req.body);
      await donation.save();
      console.log("✅ Donation saved:", donation);

      io.emit("newDonation", donation);
      res.status(201).json({
        message: "Donation created successfully",
        donation,
      });
    } catch (error) {
      console.error("❌ Donation create error:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  // Get all donations
  router.get("/", async (req, res) => {
    try {
      const donations = await Donation.find().sort({ createdAt: -1 });
      res.json(donations);
    } catch (error) {
      console.error("❌ Get donations error:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  // Book a donation
  router.patch("/book/:id", async (req, res) => {
    try {
      const donation = await Donation.findById(req.params.id);
      if (!donation) return res.status(404).json({ message: "Donation not found" });
      if (donation.status === "booked") return res.status(400).json({ message: "Already booked" });

      donation.status = "booked";
      await donation.save();
      io.emit("donationBooked", donation);
      res.json(donation);
    } catch (error) {
      console.error("❌ Booking error:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
