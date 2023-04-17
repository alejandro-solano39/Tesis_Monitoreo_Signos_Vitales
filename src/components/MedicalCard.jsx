// MedicalCard.js
import React from 'react';

const MedicalCard = ({ title, value, unit }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 w-full md:w-1/4 mx-2 my-2">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex items-center justify-center">
        <span className="text-4xl font-bold">{value}</span>
        {unit && <span className="text-xl ml-2">{unit}</span>}
      </div>
    </div>
  );
};

export default MedicalCard;
