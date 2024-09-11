import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';
import { FaThermometerHalf, FaLungs } from 'react-icons/fa';
import { MdOutlineSpeed, MdOutlineBloodtype } from 'react-icons/md';

const AlertHistory = () => {
    const [alerts, setAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3001/api/latest_alerts');
                if (!response.ok) {
                    throw new Error(`Error HTTP! Estado: ${response.status}`);
                }
                const data = await response.json();
                setAlerts(data);
            } catch (error) {
                console.error('Error al obtener las alertas:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const AlertCard = ({ alert }) => (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Alerta de Salud</h3>
            <p className="text-sm text-gray-600">Paciente: {`${alert.name} ${alert.paternalLastName} ${alert.maternalLastName}`}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                {alert.ritmo_cardiaco && <p className="flex items-center text-red-500"><MdOutlineSpeed className="mr-2" />Ritmo Cardíaco: {alert.ritmo_cardiaco} BPM</p>}
                {alert.oxigenacion_sangre && <p className="flex items-center text-blue-500"><FaLungs className="mr-2" />Oxigenación de Sangre: {alert.oxigenacion_sangre}%</p>}
                {alert.presion_arterial_sistolica && alert.presion_arterial_diastolica && <p className="flex items-center text-purple-500"><MdOutlineBloodtype className="mr-2" />Presión Arterial: {alert.presion_arterial_sistolica}/{alert.presion_arterial_diastolica} mmHg</p>}
                {alert.temperatura && <p className="flex items-center text-yellow-500"><FaThermometerHalf className="mr-2" />Temperatura: {alert.temperatura}°C</p>}
            </div>
        </div>
    );

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><div className="text-center text-gray-500">Cargando alertas...</div></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-full"><div className="text-center text-red-500">Error: {error}</div></div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-6">
                <BiBell className="text-3xl text-red-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Historial de Alertas</h2>
            </div>
            <div className="space-y-4">
                {alerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))}
            </div>
            <div className="mt-6 text-right">
                <Link to="/Alertas">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">Ver Todas las Alertas</button>
                </Link>
            </div>
        </div>
    );
};

export default AlertHistory;
