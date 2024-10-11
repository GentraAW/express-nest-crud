import axios from 'axios';

// express
export const axiosInstanceExpress = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 2000,
});

axiosInstanceExpress.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor run express');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceExpress.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor express');
    return response;
  },
  (error) => {
    console.log('Error Interceptor express', error.response);
    return Promise.reject(error);
  }
);

// nest js
export const axiosInstanceNest = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 2000,
});

axiosInstanceNest.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor run nest');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceNest.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor nest');
    return response;
  },
  (error) => {
    console.log('Error Interceptor nest', error.response);
    return Promise.reject(error);
  }
);
