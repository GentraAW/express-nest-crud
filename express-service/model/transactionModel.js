import { prismaClient } from "../prisma-client.js"; 

export const createTransaction = async (data) => {  
    const { qty, customer_id, food_id } = data;  

    try {  
      const food = await prismaClient.foods.findUnique({  
        where: {  
          food_id: food_id,  
        },  
        select: {  
          price: true,  
          stock: true,  
        },  
      });  

      if (qty > food.stock) {  
        throw new Error(`Requested quantity (${qty}) exceeds available stock (${food.stock})`);  
      }  

      const total_price = qty * food.price;  

      await prismaClient.foods.update({  
        where: {  
          food_id: food_id,  
        },  
        data: {  
          stock: food.stock - qty,  
        },  
      });  

      const newTransaction = await prismaClient.transactions.create({  
        data: {  
          qty,  
          total_price,  
          customer_id,  
          food_id,  
          transaction_date: new Date().toISOString(),  
        },  
      });  

      return newTransaction;  
    } catch (error) {  
      throw new Error(error.message);  
    }  
  }; 

export const getTransactions = async () => {  
    try {
        return await prismaClient.transactions.findMany({  
            include: {  
                food: true,  
                customer: true,  
            },  
        });  
    } catch (error) {
        throw new Error('Error getting transactions');
    }
};  

export const getTransactionById = async (transaction_id) => {  
    const transaction = await prismaClient.transactions.findUnique({  
        where: {  
            transaction_id: transaction_id  
        }  
    });  

    if (!transaction) {  
        throw new Error('Transaction not found');  
    }  

    return transaction;  
};  

export const updateTransaction = async (transaction_id, data) => {  
    const { qty, customer_id, food_id } = data;  

    try {  
      const existingTransaction = await prismaClient.transactions.findUnique({  
        where: {  
          transaction_id: transaction_id,  
        },  
        include: {  
          food: true,  
        },  
      });  

      if (!existingTransaction) {  
        throw new Error(`Transaction with ID ${transaction_id} not found`);  
      }  

      const food = await prismaClient.foods.findUnique({  
        where: {  
          food_id: food_id,  
        },  
        select: {  
          price: true,  
          stock: true,  
        },  
      });  

      if (!food) {  
        throw new Error(`Food with ID ${food_id} not found`);  
      }  

      const stockDiff = qty - existingTransaction.qty;  

      if (food.stock - stockDiff < 0) {  
        throw new Error(`Requested quantity (${qty}) exceeds available stock (${food.stock})`);  
      }  

      await prismaClient.foods.update({  
        where: {  
          food_id: existingTransaction.food_id,  
        },  
        data: {  
          stock: food.stock - stockDiff,  
        },  
      });  

      const total_price = qty * food.price;  

      const updatedTransaction = await prismaClient.transactions.update({  
        where: {  
          transaction_id: transaction_id,  
        },  
        data: {  
          qty,  
          total_price,  
          customer_id,  
          food_id,  
        },  
      });  

      return updatedTransaction;  
    } catch (error) {  
      throw new Error(error.message);  
    }  
  };   

export const deleteTransaction = async (transaction_id) => {  
  try {  
    const transaction = await prismaClient.transactions.findUnique({  
      where: {  
        transaction_id: transaction_id,  
      },  
      include: {  
        food: true,  
      },  
    });  

    if (!transaction) {  
      throw new Error(`Transaction with ID ${transaction_id} not found`);  
    }  

    await prismaClient.foods.update({  
      where: {  
        food_id: transaction.food_id,  
      },  
      data: {  
        stock: {  
          increment: transaction.qty,  
        },  
      },  
    });  

    await prismaClient.transactions.delete({  
      where: {  
        transaction_id: transaction_id,  
      },  
    });  

    return { message: `Transaction with ID ${transaction_id} deleted successfully` };  
  } catch (error) {  
    throw new Error(error.message);  
  }  
};
