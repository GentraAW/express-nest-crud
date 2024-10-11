import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
  getTransactions,
  createTransaction,
  deleteTransactions,
  updateTransactions,
} from '../../services/TransactionServices';
import TransactionModal from './TransactionModal';
import { useFramework } from '../../utils/FrameworkContext';

const TransactionPage = () => {
  const { selectedFramework } = useFramework();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(selectedFramework);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching Transactions:', error);
      }
    };
    fetchTransactions();
  }, [selectedFramework]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formattedDate = date
      .toLocaleString('en-GB', options)
      .replace(',', '');

    const [datePart, timePart] = formattedDate.split(' ');
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${datePart} ${timePart} ${amPm}`;
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.qty.toString().includes(searchTerm)
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.transaction_id - b.transaction_id;
    } else {
      return b.transaction_id - a.transaction_id;
    }
  });

  const currentEntries = sortedTransactions.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const formatPrice = (price) => {
    return `Rp. ${price.toLocaleString('id-ID')}`;
  };

  const totalPages = Math.ceil(filteredTransactions.length / entriesPerPage);

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

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setShowTransactionModal(true);
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleDeleteTransaction = async (transactionId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this transaction item?'
    );
    if (!confirm) return;

    try {
      await deleteTransactions(selectedFramework, transactionId);

      const data = await getTransactions(selectedFramework);
      setTransactions(data);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleSaveTransaction = async (qty, customer_id, food_id) => {
    try {
      if (selectedTransaction) {
        await updateTransactions(
          selectedFramework,
          selectedTransaction.transaction_id,
          {
            qty: parseInt(qty),
            customer_id: parseInt(customer_id),
            food_id: parseInt(food_id),
          }
        );
      } else {
        await createTransaction(selectedFramework, {
          qty: parseInt(qty),
          customer_id: parseInt(customer_id),
          food_id: parseInt(food_id),
        });
      }
      setShowTransactionModal(false);
      const data = await getTransactions(selectedFramework);
      setTransactions(data);
    } catch (error) {
      console.error('Error saving Transaction:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="relative w-full max-w-6xl p-6 bg-white rounded-lg shadow-2xl">
          <div className="absolute top-4 right-4">
            <button
              className="px-3 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
              onClick={handleAddTransaction}
            >
              Add Transaction
            </button>
          </div>
          <h2 className="mb-4 text-2xl font-bold">Transaction List</h2>
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
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Food Name</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Total Price</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((transaction) => (
                <tr key={transaction.transaction_id} className="border-b">
                  <td className="px-4 py-2">{transaction.transaction_id}</td>
                  <td className="px-4 py-2">{transaction.customer.name}</td>
                  <td className="px-4 py-2">{transaction.food.food_name}</td>
                  <td className="px-4 py-2">{transaction.qty}</td>
                  <td className="px-4 py-2">
                    {formatPrice(transaction.total_price)}
                  </td>
                  <td className="px-4 py-2">
                    {formatDate(transaction.transaction_date)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="px-2 py-1 mr-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => handleEditTransaction(transaction)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                      onClick={() =>
                        handleDeleteTransaction(transaction.transaction_id)
                      }
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
      {showTransactionModal && (
        <TransactionModal
          onClose={() => setShowTransactionModal(false)}
          onSave={handleSaveTransaction}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default TransactionPage;
