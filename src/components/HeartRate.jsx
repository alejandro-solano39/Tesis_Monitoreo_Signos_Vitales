import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { GiHeartBeats } from 'react-icons/gi';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HeartRate = ({ initialBpm = 75, patientId }) => {
  const [bpm, setBpm] = useState(initialBpm);
  const [heartRateStatus, setHeartRateStatus] = useState('Normal');
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bpmRef = useRef(bpm);

  useEffect(() => {
    const fetchHeartRate = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/heartRate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBpm(data.heartRate);
      } catch (error) {
        console.error('Error al obtener el ritmo cardíaco:', error);
        toast.error('Error al cargar datos del ritmo cardíaco');
      }
    };

    const intervalId = setInterval(fetchHeartRate, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let statusMessage = `Normal: ${bpm} BPM`;
    if (bpm < 60 || bpm > 100) {
      statusMessage = `Peligro: ${bpm} BPM`;
    } else if (bpm <= 70 || bpm >= 90) {
      statusMessage = `Precaución: ${bpm} BPM`;
    }

    setHeartRateStatus(statusMessage);

    setChartData(prevData => [...prevData.slice(-11), {
      time: new Date().toLocaleTimeString(),
      value: bpm,
      status: statusMessage
    }]);

    if (statusMessage.startsWith('Peligro') && bpmRef.current !== 'Peligro') {
      toast.error(`Peligro: El ritmo cardíaco del paciente es ${bpm} BPM, anormalmente alto o bajo.`);
      bpmRef.current = 'Peligro';
    } else if (statusMessage.startsWith('Normal') && bpmRef.current !== 'Normal') {
      toast.success(`Normal: El ritmo cardíaco del paciente es ${bpm} BPM.`);
      bpmRef.current = 'Normal';
    }

    // Guardar datos de ritmo cardíaco en la base de datos
    saveHeartRateData({ patient_id: patientId, bpm: bpm });
  }, [bpm, patientId]);

  // Función para guardar datos de ritmo cardíaco
  const saveHeartRateData = async (data) => {
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
      console.log('Datos de ritmo cardíaco guardados con éxito');
    } catch (error) {
      console.error('Error al guardar el ritmo cardíaco:', error);
      toast.error('Error al guardar datos de ritmo cardíaco: ' + error.message);
    }
  };

  let color = '';
  let colorValue = '';
  switch (heartRateStatus.split(':')[0]) {
    case 'Peligro':
      color = 'text-red-500';
      colorValue = '#EF4444';
      break;
    case 'Precaución':
      color = 'text-yellow-500';
      colorValue = '#FBBF24';
      break;
    default:
      color = 'text-green-500';
      colorValue = '#10B981';
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleShow}>
        <div className="text-center flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Ritmo Cardíaco <GiHeartBeats className="inline-block ml-2" /></h1>
          <div className={`text-6xl font-semibold ${color} mb-4`}>{bpm} BPM</div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Area type="monotone" dataKey="value" stroke="none" fill={colorValue} fillOpacity={0.2} />
              <YAxis hide domain={['auto', 'auto']} />
              <XAxis hide dataKey="time" />
              <Tooltip formatter={(value, name, props) => [props.payload.status, 'Estado']} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleClose}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Ritmo Cardíaco</h3>
                    <div className="w-full h-[500px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <XAxis dataKey="time" />
                          <YAxis label={{ value: 'BPM', angle: -90, position: 'insideLeft' }} />
                          <Tooltip formatter={(value, name, props) => [props.payload.status, 'Estado']} />
                          <Area type="monotone" dataKey="value" fill={colorValue} stroke={colorValue} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
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
        </div>
      )}
    </div>
  );
};

export default HeartRate;


