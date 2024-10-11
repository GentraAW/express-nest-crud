import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CustomerModal = ({ onClose, onSave, customer }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Name must be at least 1 character')
      .max(100, 'Name must be at most 100 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name must not contain numbers or symbols')
      .required('Name is required'),
    phone: Yup.string()
      .matches(
        /^0\d{9,12}$/,
        'Phone number must start with 0 and be between 10 and 13 digits'
      )
      .required('Phone number is required'),
    address: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .required('Address is required'),
  });

  const initialValues = {
    name: customer?.name || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values.name, values.phone, values.address);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          {customer ? 'Edit Customer' : 'Add Customer'}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 font-medium">
                  Phone
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2 font-medium">
                  Address
                </label>
                <Field
                  as="textarea"
                  id="address"
                  name="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></Field>
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-sm text-red-500"
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

export default CustomerModal;
