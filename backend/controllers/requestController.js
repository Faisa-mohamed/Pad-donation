import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { description, location } = req.body;

    if (!description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const request = await Request.create({
      description,
      location,
      status: "pending", // default
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("❌ Error creating request:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching requests:", err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};
