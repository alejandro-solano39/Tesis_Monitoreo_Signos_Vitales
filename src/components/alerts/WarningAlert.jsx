import React, { useState, useEffect } from 'react';

const WarningAlert = ({ message }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);

    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showAlert && (
        <div className="fixed z-50 bottom-4 right-4 max-w-sm w-full bg-yellow-600 shadow-lg rounded-lg pointer-events-auto animate-fade-in-down">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-white">Advertencia</h3>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-white hover:text-gray-100 transition-colors focus:outline-none"
            >
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
          <div className="px-4 py-3">
            <p className="text-sm text-white">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WarningAlert;
