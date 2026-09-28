const express = require("express");
const Booking = require("../models/booking.model");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const booking = new Booking(req.body);

        await booking.save();

        console.log("BOOKING SAVED:", booking);

        res.json({
            message: "Booking saved successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Booking failed"
        });
    }
});








module.exports = router;