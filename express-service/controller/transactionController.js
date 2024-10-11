import { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction } from "../model/transactionModel.js";  

export const createTransactionData = async (req, res) => {  
    const { qty, customer_id, food_id } = req.body;  
  
    try {  
      const newTransaction = await createTransaction({ qty, customer_id, food_id });  
      res.status(201).json(newTransaction);  
    } catch (error) {  
      res.status(500).json({ error: error.message });  
    }  
  };  

export const getTransactionData = async (req, res) => {  
    try {  
      const transactions = await getTransactions();  
      res.json(transactions);  
    } catch (error) {  
      res.status(500).json({ error: error.message });  
    }  
  };  

export const getTransactionDataById = async (req, res) => {  
    const { id } = req.params;  
    const transactionId = parseInt(id);  

    try {  
        const transaction = await getTransactionById(transactionId);  
        res.json(transaction);  
    } catch (error) {  
        if (error.message === 'Transaction not found') {  
            return res.status(404).json({ error: error.message });  
        }  
        res.status(500).json({ error: error.message });  
    }  
};  

export const updateTransactionData = async (req, res) => {  
    const { id } = req.params;  
    const { qty, customer_id, food_id } = req.body;  
  
    try {  
      const updatedTransaction = await updateTransaction(parseInt(id), { qty, customer_id, food_id });  
      res.json(updatedTransaction);  
    } catch (error) {  
      res.status(500).json({ error: error.message });  
    }  
  };  

export const deleteTransactionData = async (req, res) => {  
    const { id } = req.params;  
    const transactionId = parseInt(id);  

    try {  
        await deleteTransaction(transactionId);  
        res.json({ message: `Successful deleted transaction with id: ${transactionId}` });  
    } catch (error) {  
        if (error.message === 'Transaction not found') {  
            return res.status(404).json({ error: error.message });  
        }  
        res.status(500).json({ error: error.message });  
    }  
};
