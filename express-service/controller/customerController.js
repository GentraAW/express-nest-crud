import { createCustomer, getCustomers, updateCustomer, deleteCustomer, getCustomerById } from "../model/customerModel.js";  

export const createData = async (req, res) => {  
    const { name, phone, address } = req.body;  

    try {    
        const newCustomer = await createCustomer({ name, phone, address });  
        res.status(201).json(newCustomer);  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
};  

export const getData = async (req, res) => {  
    try {  
        const customers = await getCustomers();  
        res.json(customers);  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
};  

export const getDataById = async (req, res) => {  
    const { no } = req.params;  
    const customerNo = parseInt(no);  

    try {  
        const customer = await getCustomerById(customerNo);  
        res.json(customer);  
    } catch (error) {  
        if (error.message === 'Customer not found') {  
            return res.status(404).json({ error: error.message });  
        }  
        res.status(500).json({ error: error.message });  
    }  
};  

export const updateData = async (req, res) => {  
    const { no } = req.params;  
    const { name, phone, address } = req.body;  
    const customerNo = parseInt(no);  

    try {  
        const customer = await updateCustomer(customerNo, { name, phone, address });  
        res.json(customer);  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
};  

export const deleteData = async (req, res) => {  
    const { no } = req.params;  
    const customerNo = parseInt(no);  

    try {   
        await deleteCustomer(customerNo);  
        res.json({ message: `Successful deleted customer with id: ${customerNo}` });  
    } catch (error) {  
        if (error.message === 'Customer not found') {  
            return res.status(404).json({ error: error.message });  
        }  
        res.status(500).json({ error: error.message });  
    }  
};