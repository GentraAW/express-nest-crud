import { axiosInstanceExpress, axiosInstanceNest } from "../utils/config";

export const getCustomers = async (backend) => {
  try {
    if (backend === "express") {
      const response = await axiosInstanceExpress.get("/customer");
      return response.data;
    } else if (backend === "nest") {
      const response = await axiosInstanceNest.get("/customer");
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

export const deleteCustomers = async (backend, customerId) => {
  try {
    if (backend === "express") {
      const response = await axiosInstanceExpress.delete(
        `/customer/${customerId}`
      );
      return response.data;
    } else if (backend === "nest") {
      const response = await axiosInstanceNest.delete(
        `/customer/${customerId}`
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting customer", error);
    throw error;
  }
};

export const createCustomer = async (backend, customerData) => {
  try {
    if (backend === "express") {
      const response = await axiosInstanceExpress.post(
        "/customer",
        customerData
      );
      return response.data;
    } else if (backend === "nest") {
      const response = await axiosInstanceNest.post("/customer", customerData);
      return response.data;
    }
  } catch (error) {
    console.error("Error creating customer", error);
    throw error;
  }
};

export const updateCustomers = async (backend, customerId, customerData) => {
  try {
    if (backend === "express") {
      const response = await axiosInstanceExpress.put(
        `/customer/${customerId}`,
        customerData
      );
      return response.data;
    } else if (backend === "nest") {
      const response = await axiosInstanceNest.put(
        `/customer/${customerId}`,
        customerData
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error updating customer", error);
    throw error;
  }
};
