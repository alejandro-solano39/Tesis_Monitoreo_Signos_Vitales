import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { RiUserLine } from 'react-icons/ri';
import { BiMaleSign, BiFemaleSign } from 'react-icons/bi';

const EditPatientModal = ({ isModalOpen, closeModal, patient, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    paternalLastName: '',
    maternalLastName: '',
    birthdate: null,
    gender: '',
    CURP: ''
  });

  useEffect(() => {
    if (patient && isModalOpen) {
      setFormData({
        id: patient.id, // Incluye el ID del paciente aquí
        name: patient.name || '',
        paternalLastName: patient.paternalLastName || '',
        maternalLastName: patient.maternalLastName || '',
        birthdate: patient.birthdate ? dayjs(patient.birthdate) : null,
        gender: patient.gender || '',
        CURP: patient.CURP || ''
      });
    }
  }, [patient, isModalOpen]);

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthdate: date });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Aquí pasas los datos actualizados, incluyendo el id
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 space-y-4">
        <h2 className="text-xl font-bold mb-2">Editar Paciente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <label>Nombre(s) <span className="text-red-500">*</span></label>
            <div className="relative">
              <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Escribe tu nombre"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Apellido Paterno <span className="text-red-500">*</span></label>
            <div className="relative">
              <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                type="text"
                name="paternalLastName"
                value={formData.paternalLastName}
                onChange={handleChange}
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Escribe tu apellido paterno"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Apellido Materno <span className="text-red-500">*</span></label>
            <div className="relative">
              <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                type="text"
                name="maternalLastName"
                value={formData.maternalLastName}
                onChange={handleChange}
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Escribe tu apellido materno"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Fecha de Nacimiento <span className="text-red-500">*</span></label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formData.birthdate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="gender" className="block font-medium text-gray-700">Género <span className="text-red-500">*</span></label>
            <div className="relative">
              {formData.gender === "Male" ? (
                <BiMaleSign className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              ) : formData.gender === "Female" ? (
                <BiFemaleSign className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              ) : (
                <div className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange}
                className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pl-10 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="" className="text-gray-400">Seleccione un género</option>
                <option value="Male" className="text-gray-700">Masculino</option>
                <option value="Female" className="text-gray-700">Femenino</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <label>CURP <span className="text-red-500">*</span></label>
            <div className="relative">
              <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                type="text"
                name="CURP"
                value={formData.CURP}
                onChange={handleChange}
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                placeholder="Escribe la CURP del paciente"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-900 transition-colors">

              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
