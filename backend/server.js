import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import { connect } from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/library", (req, res) => {
    res.send("Service is Running but Updated");
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server stated at http://localhost:" + PORT);
});