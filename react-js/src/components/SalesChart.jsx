import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const SalesChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.food_name === item.food.food_name);
    if (existingItem) {
      existingItem.total_price += item.total_price;
    } else {
      acc.push({
        food_name: item.food.food_name,
        total_price: item.total_price,
      });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-2xl">
      <h2 className="mb-4 text-xl font-bold">Sales</h2>
      <LineChart width={500} height={300} data={aggregatedData}>
        <XAxis dataKey="food_name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default SalesChart;
