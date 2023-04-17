import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { MedicalCard, Nav, DistanceDisplay, TemperatureDisplay, HeartRate, OxygenLevel, PatientTemperature, PatientAlerts, Profile, Slider, Dashboard
,DoctorWelcomeCard, Note, AlertHistory, PatientList, HomeDashboard, PatientForm, } from './components';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="bg-gradient-to-b from-blue-200 fulls- creen">
      {!isDashboard && <Nav />}
      <Routes>
        <Route path="/perfil" element={<Profile />} />
        <Route path="/" element={
            <div className="grid grid-cols-3 gap-8 p-8">
              <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                <HeartRate bpm={95} />
              </div>
              <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                <OxygenLevel level={98} />
              </div>
              <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                {/* Aquí va el espacio para la foto */}
              </div>
              <div className="col-span-3 md:col-span-2 h-[320px]">
                <div className="grid grid-cols-2 gap-8 h-full">
                  <div className="bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                    <PatientAlerts count={6} />
                  </div>
                  <div className="bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                    <PatientTemperature temperature={37.8} />
                  </div>
                </div>
              </div>
            </div>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
