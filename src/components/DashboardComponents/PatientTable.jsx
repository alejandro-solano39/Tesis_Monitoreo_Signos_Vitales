import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdRemoveRedEye } from 'react-icons/md';

function PatientTable() {
  const [patients, setPatients] = useState([]);
  const maxPatientsToShow = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data.map(patient => ({
        ...patient,
        bgColor: getRandomColor()
      })));
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  function getRandomColor() {
    const colorClasses = [
      'bg-red-300', 'bg-green-300', 'bg-blue-300', 
      'bg-yellow-300', 'bg-purple-300', 'bg-pink-300', 'bg-indigo-300'
    ];
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  }

  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="bg-white p-4 max-w-4xl mx-auto rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Pacientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="text-xs uppercase text-gray-500 bg-gray-100">
            <tr>
              <th className="py-3 px-6">Imagen</th>
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Edad</th>
              <th className="py-3 px-6">Género</th>
              <th className="py-3 px-6">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {patients.slice(0, maxPatientsToShow).map((patient, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 px-6">
                  <div className={`flex justify-center items-center rounded-full h-10 w-10 text-white ${patient.bgColor}`}>
                    {getInitials(patient.name)}
                  </div>
                </td>
                <td className="py-4 px-6">{`${patient.name} ${patient.paternalLastName} ${patient.maternalLastName}`}</td>
                <td className="py-4 px-6">{patient.age}</td>
                <td className="py-4 px-6">{patient.gender}</td>
                <td className="py-4 px-6">
                  <Link to={`/content/${patient.id}`} className="flex justify-center items-center text-blue-500 hover:text-blue-600">
                    <MdRemoveRedEye size="24" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <Link to="/Pacientes" className="text-sm text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200">
          Ver todos los pacientes
        </Link>
      </div>
    </div>
  );
}

export default PatientTable;
