import { createFood, getFoods, updateFood, deleteFood, getFoodById } from "../model/foodModel.js";

export const createFoodData = async (req, res) => {
    const { food_name, price, stock } = req.body;
    try {
        const food = await createFood({ food_name, price, stock });
        res.json(food);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFoodData = async (req, res) => {
    try {
        const foods = await getFoods();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFoodDataById = async (req, res) => {  
    const { no } = req.params;  
    const foodId = parseInt(no);  

    try {   
        const food = await getFoodById(foodId);  
        res.json(food);  
    } catch (error) {    
        if (error.message === 'Food not found') {  
            return res.status(404).json({ error: error.message });  
        }   
        res.status(500).json({ error: error.message });  
    }  
};  

export const updateFoodData = async (req, res) => {  
    const { no } = req.params;  
    const { food_name, price, stock } = req.body;  
    const foodId = parseInt(no);  
  
    try {  
      const updatedFood = await updateFood(foodId, { food_name, price, stock });  
      res.json(updatedFood);  
    } catch (error) {  
      res.status(500).json({ error: error.message });  
    }  
  }; 

export const deleteFoodData = async (req, res) => {
    const { no } = req.params;
    const foodId = parseInt(no);
    try {   
        await deleteFood(foodId);  
        res.json({ message: `Successful deleted customer with id: ${foodId}` });  
    } catch (error) {  
        if (error.message === 'Food not found') {  
            return res.status(404).json({ error: error.message });  
        }  
        res.status(500).json({ error: error.message });  
    }  
};