require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Tiffin } = require("../model/meal");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected..."))
    .catch((err) => console.log("❌ MongoDB connection error:", err));

// ---------------- CRUD Operations using Query Parameters ----------------

// 1️⃣ **Create Tiffin Entry (POST)**
app.post("/api/meal", async (req, res) => {
    try {
        const newTiffin = new Tiffin(req.body);
        const savedTiffin = await newTiffin.save();
        res.status(201).json(savedTiffin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2️⃣ **Get All Tiffin Entries (GET)**
app.get("/api/meal", async (req, res) => {
    try {
        const tiffins = await Tiffin.find();
        res.json(tiffins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put("/api/meal", async (req, res) => {
    try {
        const updatedTiffin = await Tiffin.findOneAndUpdate(req.query, req.body, { new: true });
        if (!updatedTiffin) return res.status(404).json({ message: "Tiffin not found" });
        res.json(updatedTiffin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5️⃣ **Delete Tiffin Entry by Query (DELETE)**
app.delete("/api/meal", async (req, res) => {
    try {
        const deletedTiffin = await Tiffin.findOneAndDelete(req.query);
        if (!deletedTiffin) return res.status(404).json({ message: "Tiffin not found" });
        res.json({ message: "Tiffin entry deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server Listener
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
