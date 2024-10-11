import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ProductChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.food_name === item.food_name);
    if (existingItem) {
      existingItem.stock += item.stock;
    } else {
      acc.push({ food_name: item.food_name, stock: item.stock });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-2xl">
      <h2 className="mb-4 text-xl font-bold">Total Products</h2>
      <BarChart width={500} height={300} data={aggregatedData}>
        <XAxis dataKey="food_name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="stock" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ProductChart;
