const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    date:String
});

const Booking  = mongoose.model("Booking", contactSchema);

module.exports = Booking ;