import React, { useState, useEffect } from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorAlert from './alerts/ErrorAlert';
import WarningAlert from './alerts/WarningAlert';
import SuccessAlert from './alerts/SuccessAlert';

const PatientBloodPressure = ({ systolic, diastolic }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (systolic < 90 || systolic > 140 || diastolic < 60 || diastolic > 90) {
      setNotification('danger');
    } else if ((systolic >= 90 && systolic <= 120) && (diastolic >= 60 && diastolic <= 80)) {
      setNotification('success');
    } else {
      setNotification('warning');
    }
  }, [systolic, diastolic]);

  useEffect(() => {
    if (notification === 'danger') {
      toast.error('La presión arterial del paciente es anormalmente alta o baja.');
    } else if (notification === 'warning') {
      toast.warning('La presión arterial del paciente está ligeramente fuera del rango normal.');
    } else if (notification === 'success') {
      toast.success('La presión arterial del paciente está dentro del rango normal.');
    }
  }, [notification]);

  return (
    <div className="flex flex-col">
      <div className="bg-white p-5 rounded-xl">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Presión Arterial del Paciente
            <FaHeartbeat className="inline-block ml-2" />
          </h1>
          <div className="text-6xl font-semibold text-blue-800 mb-4">
            {systolic}/{diastolic} mmHg
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBloodPressure;
