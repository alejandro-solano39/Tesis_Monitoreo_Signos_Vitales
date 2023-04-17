import React from 'react';
import { UserCircleIcon } from '@heroicons/react/solid';
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/outline';

const minimalistPatients = [
  { name: 'John Doe', age: 28, gender: 'Male', status: 'Stable', photo: 'path/to/photo1.jpg', condition: 'Recuperándose', procedure: 'Cirugía' },
  { name: 'Jane Smith', age: 45, gender: 'Female', status: 'Critical', photo: 'path/to/photo2.jpg', condition: 'En observación', procedure: 'Tratamiento' },
  { name: 'Bob Johnson', age: 62, gender: 'Male', status: 'Stable', photo: 'path/to/photo3.jpg', condition: 'Recuperándose', procedure: 'Cirugía' },
  { name: 'Alice Williams', age: 34, gender: 'Female', status: 'Serious', photo: 'path/to/photo4.jpg', condition: 'En observación', procedure: 'Tratamiento' },
  { name: 'David Davis', age: 56, gender: 'Male', status: 'Stable', photo: 'path/to/photo5.jpg', condition: 'Recuperándose', procedure: 'Cirugía' },
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'Stable':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case 'Serious':
      return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
    case 'Critical':
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const MinimalistPatientTable = () => {
  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-2">Pacientes</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Foto</th>
            <th className="text-left p-2">Nombre</th>
            <th className="text-left p-2">Edad</th>
            <th className="text-left p-2">Género</th>
            <th className="text-left p-2">Estado</th>
            <th className="text-left p-2">Condición</th>
            <th className="text-left p-2">Procedimiento</th>
            <th className="text-left p-2">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {minimalistPatients.map((patient, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              <td className="p-2">
                <img src={patient.photo} alt={`${patient.name}'s foto`} className="w-12 h-12 rounded-full" />
              </td>
              <td className="font-semibold p-2">{patient.name}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2 flex itemsitems-center">
            <UserCircleIcon className={`h-5 w-5 mr-2 ${patient.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}`} />
            {patient.gender}
          </td>
         
          <td className="p-2">{patient.condition}</td>
          <td className="p-2 flex items-center">
            {getStatusIcon(patient.status)}
            <span className="ml-2">{patient.status}</span>
          </td>
          <td className="p-2">{patient.procedure}</td>
          <td className="p-2">
            <button className="border border-sky-600 text-sky-600 py-1 px-3 hover:bg-sky-600 hover:text-white rounded-xl transition-colors">
              <InformationCircleIcon className="h-5 w-5 inline" />
              <span className="ml-2">Detalles</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="mt-4">
  </div>
</div>
);
};

export default MinimalistPatientTable;
