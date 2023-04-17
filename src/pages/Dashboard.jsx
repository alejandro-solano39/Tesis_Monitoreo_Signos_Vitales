import React, { useState } from 'react';
import { Slider, HomeDashboard, PatientList, PatientForm } from '../components';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('inicio');
  const [patients, setPatients] = useState([]);
  const [showPatientForm, setShowPatientForm] = useState(false);

  const handleAddPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  const handleShowPatientForm = () => {
    setShowPatientForm(!showPatientForm);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'pacientes':
        return (
          <div className="ml-80">
            <div className="border border-gray-300 shadow-lg bg-white p-6 rounded-xl my-6 mx-6">
              <PatientList patients={patients} />
            </div>
          </div>
        );
      case 'patients':
        return (
          <div className="ml-80">
            <div className="border border-gray-300 shadow-lg bg-white p-6 rounded-xl my-6 mx-6">
              <PatientForm onSubmit={handleAddPatient} />
            </div>
          </div>
        );
      default:
        return (
          <div className="ml-80">
            <HomeDashboard />
            
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-x-hidden">
      <div className="fixed">
        <Slider setActiveComponent={setActiveComponent} />
      </div>
      <main className="flex-grow">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
