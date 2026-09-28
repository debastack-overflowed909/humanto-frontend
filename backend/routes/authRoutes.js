const express = require("express");
const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            email,
            password:hashedPassword
        });

        await user.save();

        res.json({
            message: "User created successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Signup failed"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        console.log("BODY:", req.body);



        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }
        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )


        res.json({
            message: "Login successful",
            token:token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});


module.exports = router;