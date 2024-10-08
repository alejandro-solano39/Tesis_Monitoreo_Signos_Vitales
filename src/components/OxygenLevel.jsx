import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaTint } from 'react-icons/fa';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';

const OxygenLevel = ({ patientId }) => {
  const [oxygenLevel, setOxygenLevel] = useState(95);
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastNotification = useRef(null);

  useEffect(() => {
    const fetchOxygenLevel = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/oxygenLevel');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOxygenLevel(data.oxygenLevel);

        setChartData(prevData => [...prevData.slice(-11), { 
          time: new Date().toLocaleTimeString(), 
          value: data.oxygenLevel 
        }]);
      } catch (error) {
        console.error('Error al obtener el nivel de oxígeno:', error);
        toast.error('Error al cargar datos del nivel de oxígeno');
      }
    };

    const intervalId = setInterval(fetchOxygenLevel, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let statusMessage = oxygenLevel < 90 ? `Peligro: ${oxygenLevel}%` : `Normal: ${oxygenLevel}%`;

    if (statusMessage.startsWith('Peligro') && lastNotification.current !== 'Peligro') {
      toast.error(`Peligro: El nivel de oxígeno en sangre es ${oxygenLevel}%, anormalmente bajo.`);
      lastNotification.current = 'Peligro';
    } else if (statusMessage.startsWith('Normal') && lastNotification.current !== 'Normal') {
      toast.success(`Normal: El nivel de oxígeno en sangre es ${oxygenLevel}%.`);
      lastNotification.current = 'Normal';
    }

    // Guardar datos de nivel de oxígeno en la base de datos
    saveOxygenLevelData({ patient_id: patientId, oxygenLevel: oxygenLevel });
  }, [oxygenLevel, patientId]);

  // Función para guardar datos de nivel de oxígeno
  const saveOxygenLevelData = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/vital_signs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      console.log('Datos de nivel de oxígeno guardados con éxito');
    } catch (error) {
      console.error('Error al guardar el nivel de oxígeno:', error);
      toast.error('Error al guardar datos de nivel de oxígeno: ' + error.message);
    }
  };

  let color = '';
  let colorValue = '';
  if (oxygenLevel < 90) {
    color = 'text-red-500';
    colorValue = '#EF4444';
  } else if (oxygenLevel < 95) {
    color = 'text-yellow-500';
    colorValue = '#FBBF24';
  } else {
    color = 'text-green-500';
    colorValue = '#10B981';
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleShow}>
        <div className="text-center flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Nivel de Oxígeno en Sangre <FaTint className="inline-block ml-2" />
          </h1>
          <div className={`text-5xl font-semibold ${color} mb-4`}>
            {oxygenLevel}% 
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Area type="monotone" dataKey="value" stroke="none" fill={colorValue} fillOpacity={0.2} />
              <YAxis hide domain={['auto', 'auto']} />
              <XAxis hide dataKey="time" />
              <Tooltip formatter={(value, name, props) => [props.payload.range, 'Estado']} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleClose}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Nivel de Oxígeno en Sangre</h3>
                  </div>
                </div>
                <div className="w-full h-[500px] mt-4">
                  <ResponsiveContainer>
                    <AreaChart data={chartData}>
                      <XAxis dataKey="time" />
                      <YAxis>
                        <Label value="Oxígeno (%)" angle={-90} position="insideLeft" />
                      </YAxis>
                      <Tooltip formatter={(value, name, props) => [props.payload.range, 'Estado']} />
                      <Area type="monotone" dataKey="value" fill={colorValue} stroke={colorValue} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OxygenLevel;
