import { axiosInstanceExpress, axiosInstanceNest } from '../utils/config';

export const getFoods = async (backend) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.get('/food');
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.get('/food');
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching Foods', error);
    throw error;
  }
};

export const deleteFoods = async (backend, foodId) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.delete(`/food/${foodId}`);
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.delete(`/food/${foodId}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error deleting food', error);
    throw error;
  }
};

export const createFood = async (backend, foodData) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.post('/food', foodData);
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.post('/food', foodData);
      return response.data;
    }
  } catch (error) {
    console.error('Error creating food', error);
    throw error;
  }
};

export const updateFoods = async (backend, foodId, foodData) => {
  try {
    if (backend === 'express') {
      const response = await axiosInstanceExpress.put(
        `/food/${foodId}`,
        foodData
      );
      return response.data;
    } else if (backend === 'nest') {
      const response = await axiosInstanceNest.put(`/food/${foodId}`, foodData);
      return response.data;
    }
  } catch (error) {
    console.error('Error updating food', error);
    throw error;
  }
};
