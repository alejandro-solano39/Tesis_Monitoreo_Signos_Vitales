import React from 'react';

const DoctorWelcomeCard = () => {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row justify-center items-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Doctor's profile picture"
        className="rounded-full w-24 h-24 object-cover mb-4 md:mr-8"
      />
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          ¡Bienvenido, Dr. Martínez!
        </h2>
        <p className="text-gray-600">
          Le deseamos un excelente día en su práctica médica.
        </p>
      </div>
    </div>
  );
};

export default DoctorWelcomeCard;
