const express = require("express");
const Contact = require("../models/contact.model");

const router = express.Router();



router.post("/",async (req, res) => {
    try {
        const contact = new Contact(req.body);

        await contact.save();

        console.log("CONTACT SAVED:", contact);

        res.json({
            message: "Message saved successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to save message"
        });
    }
});



module.exports = router;