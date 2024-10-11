import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
  getFoods,
  createFood,
  deleteFoods,
  updateFoods,
} from '../../services/FoodServices';
import FoodModal from './FoodModal';
import { useFramework } from '../../utils/FrameworkContext';

const FoodPage = () => {
  const { selectedFramework } = useFramework();
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods(selectedFramework);
        setFoods(data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };
    fetchFoods();
  }, [selectedFramework]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const filteredFoods = foods.filter((food) =>
    food.food_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFoods = filteredFoods.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.food_id - b.food_id;
    } else {
      return b.food_id - a.food_id;
    }
  });

  const currentEntries = sortedFoods.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredFoods.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleAddFood = () => {
    setSelectedFood(null);
    setShowFoodModal(true);
  };

  const handleEditFood = (food) => {
    setSelectedFood(food);
    setShowFoodModal(true);
  };

  const handleDeleteFood = async (foodId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this food item?'
    );
    if (!confirm) return;

    try {
      await deleteFoods(selectedFramework, foodId);
      const data = await getFoods(selectedFramework);
      setFoods(data);
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  const handleSaveFood = async (food_name, price, stock) => {
    try {
      if (selectedFood) {
        await updateFoods(selectedFramework, selectedFood.food_id, {
          food_name: food_name,
          price: parseInt(price),
          stock: parseInt(stock),
        });
      } else {
        await createFood(selectedFramework, {
          food_name: food_name,
          price: parseInt(price),
          stock: parseInt(stock),
        });
      }
      setShowFoodModal(false);
      const data = await getFoods(selectedFramework);
      setFoods(data);
    } catch (error) {
      console.error('Error saving Food:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-2xl">
          <div className="absolute top-4 right-4">
            <button
              className="px-3 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
              onClick={handleAddFood}
            >
              Add Food
            </button>
          </div>
          <h2 className="mb-4 text-2xl font-bold">Food List</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full px-3 py-2 mr-4 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">
                  ID
                  <button
                    className="text-gray-600 rounded-md "
                    onClick={handleSort}
                  >
                    {sortDirection === 'asc' ? '▲' : '▼'}
                  </button>
                </th>
                <th className="px-4 py-2 text-left">Food Name</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((food) => (
                <tr key={food.food_id} className="border-b">
                  <td className="px-4 py-2">{food.food_id}</td>
                  <td className="px-4 py-2">{food.food_name}</td>
                  <td className="px-4 py-2">{food.stock}</td>
                  <td className="px-4 py-2">{food.price}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-2 py-1 mr-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => handleEditFood(food)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                      onClick={() => handleDeleteFood(food.food_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <div>
              <label htmlFor="entries" className="mr-2">
                Entries:
              </label>
              <select
                id="entries"
                className="px-1 py-1 border border-gray-300 rounded-md"
                value={entriesPerPage}
                onChange={handleEntriesChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
            </div>
            <div>
              <button
                className={`px-3 py-1 rounded-md mr-2 ${
                  currentPage > 1
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage < totalPages
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {showFoodModal && (
        <FoodModal
          onClose={() => setShowFoodModal(false)}
          onSave={handleSaveFood}
          food={selectedFood}
        />
      )}
    </div>
  );
};

export default FoodPage;
