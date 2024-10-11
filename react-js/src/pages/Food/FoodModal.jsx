import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FoodModal = ({ onClose, onSave, food }) => {
  const validationSchema = Yup.object().shape({
    foodName: Yup.string()
      .min(4, 'Food name must be at least 4 characters')
      .max(25, 'Food name must be at most 25 characters')
      .required('Food name is required'),
    price: Yup.number()
      .min(1, 'Price must be at least 1')
      .max(9999999999, 'Price must be less than 9,999,999,999')
      .required('Price is required'),
    stock: Yup.number()
      .min(1, 'Stock must be at least 1')
      .max(1000000, 'Stock must be less than 1,000,000')
      .required('Stock is required'),
  });

  const initialValues = {
    foodName: food?.food_name || '',
    price: food?.price || '',
    stock: food?.stock || '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values.foodName, values.price, values.stock);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          {food ? 'Edit Food' : 'Add Food'}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="foodName" className="block mb-2 font-medium">
                  Food Name
                </label>
                <Field
                  type="text"
                  id="foodName"
                  name="foodName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter food name"
                />
                <ErrorMessage
                  name="foodName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block mb-2 font-medium">
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block mb-2 font-medium">
                  Stock
                </label>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter stock quantity"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-500"
                />
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

export default FoodModal;
