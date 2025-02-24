import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Service is Running but Updated");
});

app.listen(PORT, () => {
    console.log("Server stated at http://localhost:" + PORT);
});