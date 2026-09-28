require("dotenv").config();

console.log("JWT SECRET LOADED:", !!process.env.JWT_SECRET);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User.Model.js");
const authRoutes = require("./routes/authRoutes.js");
const authMiddleware = require("./middleware/authMiddleware");
const contactRoutes = require("./routes/contactRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");


const app = express();

app.use(cors());

app.use(express.json());

app.use("/contact", contactRoutes);

app.use("/booking", bookingRoutes);



app.use("/auth", authRoutes);

app.options("/login", (req, res) => {
    res.sendStatus(200);
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("Humanto backend is running");
});

app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You are authenticated!",
        user: req.user
    });
});




mongoose.connect("mongodb+srv://debasisabehera508_db_user:ekn4LVsl5rleyegK@uploades.hnapaum.mongodb.net/humanto_data")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });




app.listen(3000, () => {
    console.log("Server running on port 3000");
});




