import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProductChart from '../../components/ProductChart';
import SalesChart from '../../components/SalesChart';
import { useFramework } from '../../utils/FrameworkContext';
import { getTransactions } from '../../services/TransactionServices';
import { getFoods } from '../../services/FoodServices';

function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedFramework } = useFramework();
  const [transactionData, setTransactionData] = useState([]);
  const [stockFood, setStockFood] = useState([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const data = await getTransactions(selectedFramework);
        setTransactionData(data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    const fetchStockFood = async () => {
      try {
        const data = await getFoods(selectedFramework);
        setStockFood(data);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchStockFood();
    fetchTransactionData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log('Selected Framework:', selectedFramework);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        toggleSidebar={toggleSidebar}
        selectedFramework={selectedFramework}
      />
      <div className="p-6 mt-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-center">Dashboard</h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 justify-items-center">
            <ProductChart data={stockFood} />
            <SalesChart data={transactionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
