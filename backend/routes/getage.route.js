
import express from "express";
import User from "../models/User.js";


const router = express.Router()

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const user = await User.findOne({identity: id});
        if (!user) {
          return res.status(404).json({success: false, message: "User not found"})
        }
        res.status(200).json({ success: true, data: user });
    }catch (error) {
        res.status(500).json({success: false, error: "Server error"})
    }
})
router.get("/", async (req, res) => {
     res.send("Welcome to the website")
})


export default router;