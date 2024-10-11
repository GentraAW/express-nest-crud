import { axiosInstanceExpress, axiosInstanceNest } from '../utils/config';

export const getTransactions = async (backend) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.get('/transaction');
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.get('/transaction');
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching Transactions', error);
    throw error;
  }
};

export const deleteTransactions = async (backend, transactionId) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.delete(
        `/transaction/${transactionId}`
      );
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.delete(
        `/transaction/${transactionId}`
      );
      return response.data;
    }
  } catch (error) {
    console.error('Error deleting transaction', error);
    throw error;
  }
};

export const createTransaction = async (backend, transactionData) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.post(
        '/transaction',
        transactionData
      );
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.post(
        '/transaction',
        transactionData
      );
      return response.data;
    }
  } catch (error) {
    console.error('Error creating transaction', error);
    throw error;
  }
};

export const updateTransactions = async (
  backend,
  transactionId,
  transactionData
) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.put(
        `/transaction/${transactionId}`,
        transactionData
      );
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.put(
        `/transaction/${transactionId}`,
        transactionData
      );
      return response.data;
    }
  } catch (error) {
    console.error('Error updating transaction', error);
    throw error;
  }
};
