import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBell, BiHeart, BiError } from 'react-icons/bi';
import { FaThermometerHalf, FaLungs } from 'react-icons/fa';
import { MdOutlineSpeed, MdOutlineBloodtype } from 'react-icons/md';

const AlertHistory = () => {
    const [alerts, setAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:3001/api/latest_alerts');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAlerts(data);
            } catch (error) {
                console.error('Error fetching alerts:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const AlertCard = ({ alert }) => {
        return (
            <div className={`border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white`}>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Alerta de Salud</h3>
                <p className="text-sm font-medium text-gray-600">Paciente: {`${alert.name} ${alert.paternalLastName} ${alert.maternalLastName}`}</p>
                <div className="space-y-1 text-sm mt-2">
                    {alert.ritmo_cardiaco && <p className="flex items-center text-red-500"><MdOutlineSpeed className="mr-2" />Ritmo Cardíaco: {alert.ritmo_cardiaco} BPM</p>}
                    {alert.oxigenacion_sangre && <p className="flex items-center text-blue-500"><FaLungs className="mr-2" />Oxigenación Sangre: {alert.oxigenacion_sangre}%</p>}
                    {alert.presion_arterial_sistolica && alert.presion_arterial_diastolica && <p className="flex items-center text-purple-500"><MdOutlineBloodtype className="mr-2" />Presión Arterial: {alert.presion_arterial_sistolica}/{alert.presion_arterial_diastolica} mmHg</p>}
                    {alert.temperatura && <p className="flex items-center text-yellow-500"><FaThermometerHalf className="mr-2" />Temperatura: {alert.temperatura}°C</p>}
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <div className="text-center">Cargando alertas...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
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
                <Link to="/Alertas" >
                    <button className="text-sky-600 border border-sky-600 py-2 px-4 rounded-full hover:bg-sky-600 hover:text-white transition-colors duration-200">
                        Ver todas las alertas
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AlertHistory;
