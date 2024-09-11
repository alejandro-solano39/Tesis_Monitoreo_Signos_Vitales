import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Grid, InputLabel, FormControl, Select, MenuItem } from "@mui/material";

const PatientForm = ({ patientDetails, onUpdate }) => {
  const [patient, setPatient] = useState({
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    birthdate: null,
    age: "",
    gender: "",
    CURP: "",
  });

  const navigate = useNavigate();
  const isEditMode = !!patientDetails;
  const formTitle = isEditMode ? "Editar Paciente" : "Nuevo Paciente";

  useEffect(() => {
    if (patientDetails) {
      setPatient({
        ...patientDetails,
        birthdate: patientDetails.birthdate ? dayjs(patientDetails.birthdate) : null,
        age: calculateAge(patientDetails.birthdate),
      });
    }
  }, [patientDetails]);

  const calculateAge = (birthdate) => {
    if (!birthdate) return "";
    const today = dayjs();
    const birthDate = dayjs(birthdate);
    const years = today.diff(birthDate, "year");
    return years;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (newDate) => {
    setPatient(prev => ({
      ...prev,
      birthdate: newDate,
      age: calculateAge(newDate),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const method = isEditMode ? "patch" : "post";
      const url = isEditMode ? `http://localhost:3001/api/patients/${patientDetails.id}` : "http://localhost:3001/api/patients";

      try {
        const response = await axios({ method, url, data: patient });
        if (response.status === 200 || response.status === 201) {
          toast.success(`Paciente ${isEditMode ? "actualizado" : "agregado"} correctamente`, { position: toast.POSITION.TOP_RIGHT });
          onUpdate && onUpdate(patient);
          navigate("/Pacientes");
        } else {
          toast.error(`Error al ${isEditMode ? "actualizar" : "agregar"} paciente`, { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        toast.error(`Error al ${isEditMode ? "actualizar" : "agregar"} paciente: ${error.message}`, { position: toast.POSITION.TOP_RIGHT });
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Formulario de Paciente</h2>
        <h3 className="text-lg font-medium my-4">{formTitle}</h3>
        <Grid container spacing={3}>
          {/* Inputs distribuidos */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Nombre(s)"
              required
              value={patient.name}
              onChange={handleChange}
              name="name"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Apellido Paterno"
              required
              value={patient.paternalLastName}
              onChange={handleChange}
              name="paternalLastName"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Apellido Materno"
              required
              value={patient.maternalLastName}
              onChange={handleChange}
              name="maternalLastName"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              label="Fecha de Nacimiento"
              value={patient.birthdate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
              maxDate={dayjs()} // Prevent future dates
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Edad"
              value={patient.age}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Género</InputLabel>
              <Select
                labelId="gender-label"
                value={patient.gender}
                label="Género"
                onChange={handleChange}
                name="gender"
                required
              >
                <MenuItem value=""><em>Seleccione un género</em></MenuItem>
                <MenuItem value="Male">Masculino</MenuItem>
                <MenuItem value="Female">Femenino</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="CURP"
              required
              value={patient.CURP}
              onChange={handleChange}
              name="CURP"
              inputProps={{ maxLength: 18 }}
            />
          </Grid>
          {/* Botones de acción */}
          <Grid item xs={12} className="flex justify-between">
            <button
              type="button"
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-900"
              onClick={() => navigate("/Pacientes")}
            >
              Volver
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900"
            >
              Guardar
            </button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default PatientForm;

