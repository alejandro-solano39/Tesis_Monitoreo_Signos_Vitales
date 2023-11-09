import React from 'react';

// Asumiendo que recibes 'firstName' y 'lastName' como props
const DoctorWelcomeCard = ({ firstName, lastName }) => {
  // Crea iniciales con el primer nombre y el apellido
  const initials = `${firstName ? firstName[0] : 'N'}${lastName ? lastName[0] : 'N'}`;

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row justify-center items-center">
      <span className="flex items-center justify-center w-20 h-20 bg-slate-200 text-slate-600 border border-slate-300 uppercase font-semibold text-xl mx-2 md:mx-4 rounded-full">
        {initials}
      </span>
      <div className="text-center md:text-left">
        <h2 className="text-lg font-medium text-gray-800 mb-1">
          ¡Bienvenido, Dr/a. {lastName}! {/* Ahora muestra correctamente el apellido */}
        </h2>
        <p className="text-sm text-gray-600">
          Le deseamos un excelente día en su práctica médica.
        </p>
      </div>
    </div>
  );
};

export default DoctorWelcomeCard;

