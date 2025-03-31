const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://pdev5771:rxHFzG2xPEkkocvM@cluster0.bso1d.mongodb.net")
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log('MongoDB connection error: ' + err));

const TiffinSchema = new mongoose.Schema({
  Date: { type: String, required: true },
  NumberofTiffinAxay: { type: Number, required: true },
  NumberofTiffin_Kaushik_Bhargav: { type: Number, required: true },
  Theme: { type: String, default: "sap_horizon" },
  forLunch: { type: Boolean, default: false },
  forDinner: { type: Boolean, default: false },
  AxayMealPrice: { type: Number, default: 0 },
  Kaushik_Bhargav_meal_Price: { type: Number, default: 0 },
  Sound: { type: Boolean, default: false },
  Vibrate: { type: Boolean, default: false }
});
 

const meal = mongoose.model('meal', TiffinSchema,'meal');
module.exports = meal;