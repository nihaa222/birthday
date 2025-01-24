import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, age, message, identity } = req.body;

  // Validate required fields
  if (!name || !age || !message || !identity) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  if (typeof age !== "number" || age < 0) {
    return res.status(400).json({ success: false, error: "Invalid age" });
  }

  try {
    const user = new User({ name, age, message, identity });
    await user.save();
    res.status(201).json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data", error);
    res.status(500).json({ success: false, error: "Failed to save data" });
  }
});

export default router;
