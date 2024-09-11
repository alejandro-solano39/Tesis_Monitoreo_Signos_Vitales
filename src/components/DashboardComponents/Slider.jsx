import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiHealth, BiUserCircle, BiNotification, BiAnalyse, BiCog, BiLogOut } from 'react-icons/bi';

const Slider = () => {
  const navigate = useNavigate();
  const firstName = sessionStorage.getItem('userFirstName') || 'User';
  const lastName = sessionStorage.getItem('userLastName') || 'Name';
  const fullName = `${firstName} ${lastName}`;
  const initial = firstName ? firstName[0] : 'U';

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <aside className="w-72 bg-white shadow-lg min-h-screen flex flex-col justify-between p-5">
        <div>
          <div className="flex items-center space-x-4 p-2 mb-6">
            <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-xl font-bold text-white">
              {initial}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-gray-900">{fullName}</span>
              <span className="text-sm text-gray-500">Médico</span>
            </div>
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <Link to="/dashboard" className="flex items-center p-3 rounded-lg text-gray-900 hover:bg-blue-100 transition duration-200 ease-in-out">
                  <BiHealth className="text-blue-500 w-6 h-6"/><span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/Pacientes" className="flex items-center p-3 rounded-lg text-gray-900 hover:bg-blue-100 transition duration-200 ease-in-out">
                  <BiUserCircle className="text-blue-500 w-6 h-6"/><span className="ml-3">Pacientes</span>
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/Alertas" className="flex items-center p-3 rounded-lg text-gray-900 hover:bg-blue-100 transition duration-200 ease-in-out">
                  <BiNotification className="text-blue-500 w-6 h-6"/><span className="ml-3">Alertas</span>
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/analytics" className="flex items-center p-3 rounded-lg text-gray-900 hover:bg-blue-100 transition duration-200 ease-in-out">
                  <BiAnalyse className="text-blue-500 w-6 h-6"/><span className="ml-3">Análisis</span>
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/settings" className="flex items-center p-3 rounded-lg text-gray-900 hover:bg-blue-100 transition duration-200 ease-in-out">
                  <BiCog className="text-blue-500 w-6 h-6"/><span className="ml-3">Configuración</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <button onClick={handleLogout} className="w-full flex items-center p-3 text-gray-700 hover:text-blue-700 rounded-lg transition duration-200 ease-in-out">
            <BiLogOut className="w-6 h-6"/><span className="ml-3">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Slider;
