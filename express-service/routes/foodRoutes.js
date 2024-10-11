import express from "express";
import { createFoodData, getFoodData, updateFoodData, deleteFoodData, getFoodDataById } from "../controller/foodController.js";

const router = express.Router();

router.post("/food", createFoodData);
router.get("/food", getFoodData);
router.get("/food/:no", getFoodDataById);
router.put("/food/:no", updateFoodData);
router.delete("/food/:no", deleteFoodData);

export default router;