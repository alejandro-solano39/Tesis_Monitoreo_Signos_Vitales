// src/pages/Profile.js
import React from 'react';
import { RiUserLine, RiMailLine, RiPhoneLine, RiLockLine } from 'react-icons/ri';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Perfil de usuario</h1>
      <div className="bg-white shadow-md rounded-md p-6">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="w-full relative">
              <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Nombre(s)"
              />
            </div>
            <div className="w-full relative">
              <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Apellido paterno"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="w-full relative">
              <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Apellido materno"
              />
            </div>
            <div className="w-full relative">
              <RiMailLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Correo electrónico"
                type="email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="w-full relative">
              <RiPhoneLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Teléfono"
                type="tel"
              />
            </div>
            <div className="w-full relative">
              <RiLockLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Contraseña"
                type="password"
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              type="submit"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
