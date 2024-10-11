import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getFoods } from '../../services/FoodServices';
import { getCustomers } from '../../services/CustomerServices';
import { useFramework } from '../../utils/FrameworkContext';

const TransactionModal = ({ onClose, onSave, transaction }) => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [foods, setFoods] = useState([]);
  const [foodId, setFoodId] = useState('');
  const { selectedFramework } = useFramework();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodData = await getFoods(selectedFramework);
        if (Array.isArray(foodData)) {
          setFoods(foodData);
        } else {
          console.error('Expected an array of food data, received:', foodData);
        }
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const customerData = await getCustomers(selectedFramework);
        if (Array.isArray(customerData)) {
          setCustomers(customerData);
        } else {
          console.error(
            'Expected an array of customer data, received:',
            customerData
          );
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchFoods();
    fetchCustomers();
  }, [selectedFramework]);

  useEffect(() => {
    if (transaction) {
      setCustomerId(transaction.customer_id || '');
      setFoodId(transaction.food_id || '');
    }
  }, [transaction]);

  const validationSchema = Yup.object().shape({
    qty: Yup.number()
      .min(1, 'Minimum transaction is 1')
      .max(100, 'Maximum transaction is 100')
      .required('Qty is required'),
  });

  const initialValues = {
    qty: transaction?.qty || '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values.qty, customerId, foodId);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          {transaction ? 'Edit transaction' : 'Add transaction'}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="qty" className="block mb-2 font-medium">
                  Quantity
                </label>
                <Field
                  type="number"
                  id="qty"
                  name="qty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter quantity"
                />
                <ErrorMessage
                  name="qty"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="customer_id" className="block mb-2 font-medium">
                  Customer
                </label>
                <select
                  id="customer_id"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a customer</option>
                  {Array.isArray(customers) && customers.length > 0 ? (
                    customers.map((customer) => (
                      <option
                        key={customer.customer_id}
                        value={customer.customer_id}
                      >
                        {customer.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No customers available</option>
                  )}
                </select>
                {customerId === '' && (
                  <div className="text-sm text-red-500">
                    Customer selection is required
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="food_id" className="block mb-2 font-medium">
                  Food
                </label>
                <select
                  id="food_id"
                  value={foodId}
                  onChange={(e) => setFoodId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a food</option>
                  {Array.isArray(foods) && foods.length > 0 ? (
                    foods.map((food) => (
                      <option key={food.food_id} value={food.food_id}>
                        {food.food_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No food options available</option>
                  )}
                </select>
                {foodId === '' && (
                  <div className="text-sm text-red-500">
                    Food selection is required
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 text-white bg-gray-800 rounded-md hover:bg-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TransactionModal;
