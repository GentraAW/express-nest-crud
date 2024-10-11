import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
  getCustomers,
  createCustomer,
  deleteCustomers,
  updateCustomers,
} from '../../services/CustomerServices';
import CustomerModal from './CustomerModal';
import { useFramework } from '../../utils/FrameworkContext';

const CustomerPage = () => {
  const { selectedFramework } = useFramework();
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers(selectedFramework);
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, [selectedFramework]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.customer_id - b.customer_id;
    } else {
      return b.customer_id - a.customer_id;
    }
  });
  const currentEntries = sortedCustomers.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);

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

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowCustomerModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomers(selectedFramework, customerId);
      const data = await getCustomers(selectedFramework);
      setCustomers(data);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSaveCustomer = async (name, phone, address) => {
    try {
      if (selectedCustomer) {
        await updateCustomers(selectedFramework, selectedCustomer.customer_id, {
          name,
          phone,
          address,
        });
      } else {
        await createCustomer(selectedFramework, { name, phone, address });
      }
      setShowCustomerModal(false);

      const data = await getCustomers(selectedFramework);
      setCustomers(data);
    } catch (error) {
      console.error('Error saving customer:', error);
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
              onClick={handleAddCustomer}
            >
              Add Customer
            </button>
          </div>
          <h2 className="mb-4 text-2xl font-bold">Customer List</h2>
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
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((customer) => (
                <tr key={customer.customer_id} className="border-b">
                  <td className="px-4 py-2">{customer.customer_id}</td>
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                  <td className="px-4 py-2">{customer.address}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-2 py-1 mr-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                      onClick={() => handleDeleteCustomer(customer.customer_id)}
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
                className={`px-3 py-1 mr-2 rounded-md ${
                  currentPage > 1
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
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
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
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
      {showCustomerModal && (
        <CustomerModal
          onClose={() => setShowCustomerModal(false)}
          onSave={handleSaveCustomer}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomerPage;
