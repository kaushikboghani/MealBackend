require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Tiffin, TiffinMain } = require("../model/meal");

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

// Create Tiffin Data
app.post("/api/tiffin", async (req, res) => {
    try {
        const settingsId = "67ea98dcab2a2c37dea2c705"; // Static ID for settings
        const tiffinEntry = req.body; // Incoming tiffin entry

        const updatedSettings = await TiffinMain.findByIdAndUpdate(
            settingsId,
            { $push: { Tiffins: tiffinEntry } }, // Add entry to Tiffins array
            { new: true, upsert: true } // Return updated doc, create if missing
        );

        res.status(201).json({ message: "Tiffin entry added successfully!", updatedSettings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read All Tiffin Data
app.get("/api/tiffin", async (req, res) => {
    try {
        const tiffins = await Tiffin.find()
        res.status(200).json(tiffins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read Single Tiffin Data by ID
app.get("/api/tiffin/:id", async (req, res) => {
    try {
        const tiffin = await Tiffin.findById(req.params.id).populate("mainSettings");
        if (!tiffin) return res.status(404).json({ message: "Tiffin data not found" });
        res.status(200).json(tiffin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Tiffin Data by ID
app.put("/api/tiffin", async (req, res) => {
    try {
        const updatedTiffin = await Tiffin.findByIdAndUpdate(req.query.id, req.body, { new: true });
        if (!updatedTiffin) return res.status(404).json({ message: "Tiffin data not found" });
        res.status(200).json(updatedTiffin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Tiffin Data by ID
app.delete("/api/tiffin", async (req, res) => {
    try {
        const deletedTiffin = await Tiffin.findByIdAndDelete(req.query.id);
        if (!deletedTiffin) return res.status(404).json({ message: "Tiffin data not found" });
        res.status(200).json({ message: "Tiffin data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
