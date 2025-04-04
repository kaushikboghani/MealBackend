const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb+srv://kaushik:Kaushik2205@cluster0.hwzeo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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