import React from 'react';
import { FaUser, FaBirthdayCake, FaDiagnoses, FaHospital } from 'react-icons/fa';

const PatientProfile = ({ patient }) => {
    const { name, age, condition, hospital, photoUrl, tableData } = patient;

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex mb-8">
                        <div className="w-1/3">
                            <img src={photoUrl} alt={name} className="w-full h-64 object-cover rounded-md" />
                        </div>
                        <div className="w-2/3 px-4">
                            <h2 className="text-2xl font-bold mb-2">{name}</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <FaBirthdayCake className="text-indigo-600 w-5 h-5 mr-2" />
                                    <span className="font-semibold">Edad:</span> {age}
                                </li>
                                <li className="flex items-center">
                                    <FaDiagnoses className="text-indigo-600 w-5 h-5 mr-2" />
                                    <span className="font-semibold">Padecimiento:</span> {condition}
                                </li>
                                <li className="flex items-center">
                                    <FaHospital className="text-indigo-600 w-5 h-5 mr-2" />
                                    <span className="font-semibold">Hospital:</span> {hospital}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Datos adicionales</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    {tableData.headings.map((heading, index) => (
                                        <th key={index} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tableData.rows.map((row, index) => (
                                    <tr key={index}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;