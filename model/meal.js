const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb+srv://pdev5771:rxHFzG2xPEkkocvM@cluster0.bso1d.mongodb.net", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected..."))
.catch((err) => console.log("❌ MongoDB connection error:", err));

const TiffinSchema = new mongoose.Schema({
  Date: { type: String, required: true },
  User: { type: String, required: true },
  NumberofTiffinAxay: { type: Number },
  NumberofTiffin_Kaushik_Bhargav: { type: Number},
  NumberofTiffinvivek: { type: Number},
  TiffinTime: { type: String },
  AxayMealPrice: { type: Number},
  Kaushik_Bhargav_meal_Price: { type: Number},
  vivekMealPrice: {type: Number },
}, { timestamps: true });

const Tiffin = mongoose.model("meal", TiffinSchema);

module.exports = { Tiffin };