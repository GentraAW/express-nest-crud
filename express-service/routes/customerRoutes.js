import express from "express";
import { createData, getData, updateData, deleteData, getDataById } from "../controller/customerController.js";

const router = express.Router();

router.post("/customer", createData);
router.get("/customer", getData);
router.get("/customer/:no", getDataById);
router.put("/customer/:no", updateData);
router.delete("/customer/:no", deleteData);

export default router;