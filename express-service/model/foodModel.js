import { prismaClient } from "../prisma-client.js";

export const createFood = async (data) => {
    const { food_name, price, stock } = data;
    return prismaClient.foods.create({ 
        data: {
            food_name: food_name,
            price: price,
            stock: stock
        }
    });
};

export const getFoods = async () => {
    return prismaClient.foods.findMany(); 
};

export const getFoodById = async (food_id) => {  
    const food = await prismaClient.foods.findUnique({  
        where: {  
            food_id: food_id  
        }  
    });  
 
    if (!food) {  
        throw new Error('Food not found');  
    }  

    return food;  
};  

export const updateFood = async (food_id, data) => {  
    const { food_name, price, stock } = data;  
  
    try {  
      const updatedFood = await prismaClient.foods.update({  
        where: {  
          food_id: food_id,  
        },  
        data: {  
          food_name: food_name,  
          price: price,  
          stock: stock,  
        },  
      });  
   
      const transactions = await prismaClient.transactions.findMany({  
        where: {  
          food_id: food_id,  
        },  
        select: {  
          transaction_id: true,  
          qty: true,  
        },  
      });  
  
      for (const transaction of transactions) {  
        await prismaClient.transactions.update({  
          where: {  
            transaction_id: transaction.transaction_id,  
          },  
          data: {  
            total_price: transaction.qty * price,  
          },  
        });  
      }  
  
      return updatedFood;  
    } catch (error) {   
      console.error('Error updating food:', error);  
    
      throw new Error('Error updating food');  
    }  
  };   

export const deleteFood = async (food_id) => {
    const food = await prismaClient.foods.findUnique({  
        where: {  
            food_id: food_id  
        }  
    });  

    if (!food) {  
        throw new Error(`Food: ${food_id} not found`);  
    }  

    return prismaClient.foods.delete({  
        where: {  
            food_id: food_id  
        }  
    }); 
};