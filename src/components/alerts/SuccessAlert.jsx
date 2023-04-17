import React, { useState, useEffect } from 'react';

const SuccessAlert = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000); // 5000 ms = 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    showAlert && (
      <div className="max-w-md py-4 px-6 shadow-2xl shadow-green-800 rounded-lg bg-green-600">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl text-white font-semibold">Normal</h3>
            </div>
            <button className="text-white" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-white">{message}</p>
        </div>
      </div>
    )
  );
};

export default SuccessAlert;
