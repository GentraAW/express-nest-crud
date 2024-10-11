import { prismaClient } from "../prisma-client.js";  

export const createCustomer = async (data) => {  
    const { name, phone, address } = data;  
  
    const existingCustomer = await prismaClient.customers.findUnique({  
        where: {  
            phone: phone  
        }  
    });  

    if (existingCustomer) {  
        throw new Error('Phone number is already registered');  
    }  

    try {   
        const newCustomer = await prismaClient.customers.create({  
            data: {  
                name,  
                phone,  
                address  
            }  
        });  

        return newCustomer;  
    } catch (error) {  
        throw new Error('Error creating customer');  
    }  
};  

export const getCustomers = async () => {  
    return prismaClient.customers.findMany();  
};  

export const getCustomerById = async (customer_id) => {  
    const customer = await prismaClient.customers.findUnique({  
        where: {  
            customer_id: customer_id  
        }  
    });  

    if (!customer) {  
        throw new Error('Customer not found');  
    }  

    return customer;  
};  

export const updateCustomer = async (customer_id, data) => {  
    const { name, phone, address } = data;  

    const existingCustomer = await prismaClient.customers.findUnique({  
        where: {  
            phone: phone  
        }  
    });  

    if (existingCustomer && existingCustomer.customer_id !== customer_id) {  
        throw new Error('Phone number is already registered');  
    }  

    try {   
        return prismaClient.customers.update({  
            where: {  
                customer_id: customer_id  
            },  
            data: {  
                name: name,  
                phone: phone,  
                address: address  
            }  
        });  
    } catch (error) {    
        throw new Error('Error updating customer');  
    }  
};  

export const deleteCustomer = async (customer_id) => {   
    const customer = await prismaClient.customers.findUnique({  
        where: {  
            customer_id: customer_id  
        }  
    });  

    if (!customer) {  
        throw new Error('Customer not found');  
    }  

    return prismaClient.customers.delete({  
        where: {  
            customer_id: customer_id  
        }  
    });  
};