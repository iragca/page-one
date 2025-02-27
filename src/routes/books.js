import express from "express";
import { getBooks, postBook } from "../controllers/bookController.js";
const router = express.Router();

router.get("/", getBooks);
router.post("/", postBook);

export default router;
