import React, { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

const PatientAlerts = ({ count }) => {
  const [showHistory, setShowHistory] = useState(false);

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="col-span-2">
      <div className="bg-white p-6 rounded-xl">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Alertas del Paciente
            <AiOutlineWarning className="inline-block ml-2 text-red-500" />
          </h1>
          <div className="text-6xl font-semibold text-purple-800 mb-2">{count}</div>
          <p className="text-xl text-gray-600 mb-4">alerta(s)</p>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={handleShowHistory}
          >
            {showHistory ? 'Ocultar Historial' : 'Ver Historial'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientAlerts;
