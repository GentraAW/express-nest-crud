import express from "express";
import { createTransactionData, getTransactionData, getTransactionDataById, updateTransactionData, deleteTransactionData } from "../controller/transactionController.js";

const router = express.Router();

router.post("/transaction", createTransactionData);
router.get("/transaction", getTransactionData);
router.get("/transaction/:id", getTransactionDataById);
router.put("/transaction/:id", updateTransactionData);
router.delete("/transaction/:id", deleteTransactionData);

export default router;