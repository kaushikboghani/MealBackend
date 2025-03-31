const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb+srv://pdev5771:rxHFzG2xPEkkocvM@cluster0.bso1d.mongodb.net", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected..."))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// Main Schema for common properties with Tiffins array
const TiffinMainSchema = new mongoose.Schema({
  Sound: { type: Boolean, default: false },
  Vibrate: { type: Boolean, default: false },
  Theme: { type: String, default: "sap_horizon" },
  Tiffins: [{
    Date: { type: Date, required: true },
    NumberofTiffinAxay: { type: Number, required: true },
    NumberofTiffin_Kaushik_Bhargav: { type: Number, required: true },
    TiffinTime: { type: String },
    AxayMealPrice: { type: Number, default: 0 },
    Kaushik_Bhargav_meal_Price: { type: Number, default: 0 }
  }]
}, { timestamps: true });

const TiffinMain = mongoose.model("TiffinMain", TiffinMainSchema, "tiffin_main");

module.exports = { TiffinMain };