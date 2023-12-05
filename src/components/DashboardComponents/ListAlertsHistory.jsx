import React, { useState, useEffect } from 'react';
import { BiBell, BiHeart, BiError, BiSearch } from 'react-icons/bi';
import { FiThermometer } from 'react-icons/fi';
import { MdSpeed } from 'react-icons/md';

const determineAlertType = (alert) => {
  if (alert.ritmo_cardiaco > 100) {
    return 'Ritmo Cardiaco Anormal';
  } else if (alert.presion_arterial_sistolica > 140 || alert.presion_arterial_diastolica > 90) {
    return 'Presión Arterial Alta';
  } else if (alert.temperatura > 37.5) {
    return 'Temperatura Elevada';
  }
  return 'Alerta General';
};

const getIcon = (type) => {
  switch (type) {
    case 'Presión Arterial Alta':
      return <BiHeart className="text-red-500 mr-2" />;
    case 'Ritmo Cardiaco Anormal':
      return <BiError className="text-yellow-500 mr-2" />;
    case 'Temperatura Elevada':
      return <FiThermometer className="text-blue-500 mr-2" />;
    default:
      return <BiBell className="text-gray-500 mr-2" />;
  }
};

const getIconForDetail = (label) => {
  switch (label) {
    case 'Ritmo cardíaco':
      return <MdSpeed className="text-green-500 mr-2" />;
    case 'Oxigenación sangre':
      return <BiHeart className="text-red-500 mr-2" />;
    case 'Presión arterial sistólica':
    case 'Presión arterial diastólica':
      return <BiError className="text-yellow-500 mr-2" />;
    case 'Temperatura':
      return <FiThermometer className="text-blue-500 mr-2" />;
    default:
      return null;
  }
};
const PaginationControls = ({ page, setPage, pageSize, totalEntries }) => {
  const startEntry = (page - 1) * pageSize + 1;
  const endEntry = Math.min(page * pageSize, totalEntries);
  const isLastPage = page * pageSize >= totalEntries;

  return (
    <div className="flex justify-between items-center my-4">
      <span className="text-lg text-gray-700 dark:text-gray-400">
        Mostrando {startEntry} a {endEntry} de {totalEntries} Entradas
      </span>
      <div className="flex">
        <button 
          className="mx-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button 
          className="mx-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          onClick={() => setPage(prev => prev + 1)}
          disabled={isLastPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const AlertRow = ({ alert }) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-3">{alert.id}</td>
      <td className="px-4 py-3 flex items-center">{getIcon(alert.type)} {alert.type}</td>
      <td className="px-4 py-3">{alert.patientName || 'Nombre no disponible'}</td>
      <td className="px-4 py-3">
        {alert.timestamp.toLocaleDateString()} - {alert.timestamp.toLocaleTimeString()}
      </td>
      <td className="px-4 py-3">
        {alert.details.map((detail, detailIndex) => (
          <div key={detailIndex} className="flex items-center">
            {getIconForDetail(detail.label)}
            <span className="font-semibold">{detail.label}:</span>
            <span className="ml-2">{detail.value}</span>
          </div>
        ))}
      </td>
    </tr>
  );
};

const ListAlertsHistory = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalEntries, setTotalEntries] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/api/alerts_history?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta del servidor');
        }
        const data = await response.json();
        setTotalEntries(data.total); // Ajusta esto para obtener el total de entradas desde tu API
        const formattedAlerts = data.map(alert => {
          const timestamp = new Date(alert.fecha_hora);
          return {
            id: `ID: ${alert.id}`,
            patient: `Paciente ID: ${alert.patient_id}`,
            type: determineAlertType(alert),
            patientName: `${alert.name} ${alert.paternalLastName} ${alert.maternalLastName || ''}`.trim(),
            timestamp: timestamp instanceof Date && !isNaN(timestamp) ? timestamp : new Date(),
            details: [
              { label: "Ritmo cardíaco", value: `${alert.ritmo_cardiaco} BPM` },
              { label: "Oxigenación sangre", value: `${alert.oxigenacion_sangre}%` },
              { label: "Presión arterial sistólica", value: `${alert.presion_arterial_sistolica} mmHg` },
              { label: "Presión arterial diastólica", value: `${alert.presion_arterial_diastolica} mmHg` },
              { label: "Temperatura", value: `${alert.temperatura}°C` },
            ],
          };
        });
        setAlerts(formattedAlerts);
        setFilteredAlerts(formattedAlerts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [page]);

  useEffect(() => {
    setFilteredAlerts(
      alerts.filter(alert =>
        alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, alerts]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center font-bold">{error}</div>;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Historial de Alertas</h1>

    <div className="flex justify-between items-center mb-4">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Buscar alertas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full"
        />
        <BiSearch className="text-gray-500 mx-2 my-auto" />
      </div>
      <PaginationControls page={page} setPage={setPage} pageSize={pageSize} totalEntries={totalEntries} />
    </div>

    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full table-auto text-gray-800">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className='px-4 py-3 border-r'>ID</th>
            <th className="px-4 py-3 border-r">Tipo</th>
            <th className="px-4 py-3 border-r">Paciente</th>
            <th className="px-4 py-3 border-r">Fecha</th>
            <th className="px-4 py-3">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlerts.map((alert, index) => (
            <AlertRow key={index} alert={alert} />
          ))}
        </tbody>
      </table>
    </div>

    <PaginationControls page={page} setPage={setPage} pageSize={pageSize} totalEntries={totalEntries} />
  </div>
);
};


export default ListAlertsHistory
