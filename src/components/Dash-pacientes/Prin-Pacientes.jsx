import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { toast } from "react-toastify";
import {
  Chip,
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import ConfirmDeleteModal from "./Modal-Eliminacion";
import AddPatientModal from "./Añadir-Paciente";
import EditPatientModal from "../modal/EditPatientModal";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { MdAddCircle } from "react-icons/md"; // Asumiendo que usas React Icons
import { FiPlus } from "react-icons/fi";

const TABLE_HEAD = [
  "Pacientes",
  "Edad",
  "Genero",
  "Estado",
  "Registros",
  "Acciones",
];

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [disabledPatients, setDisabledPatients] = useState([]);
  const [enabledPatients, setEnabledPatients] = useState([]);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [patientToDisable, setPatientToDisable] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // New state for active tab

  const navigate = useNavigate();

  const openAddPatientPage = () => {
    navigate("/Añadir_Paciente");
  };

  const openEditPatientPage = (patient) => {
    navigate("/Añadir_Paciente", { state: { patientDetails: patient } });
  };
  

  //Datos del login paa el nombre de usuario
  const firstName = sessionStorage.getItem("userFirstName");
  const lastName = sessionStorage.getItem("userLastName");
  const fullName = `${firstName} ${lastName}`;

  const fetchPatients = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/patients");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []); // Dependencias vacías para que la función no cambie

  const fetchEnabledPatients = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/patients/enabled");
      const data = await response.json();
      setEnabledPatients(data);
    } catch (error) {
      console.error("Error fetching enabled patients:", error);
    }
  }, []); // Dependencias vacías

  const fetchDisabledPatients = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/patients/disabled");
      const data = await response.json();
      setDisabledPatients(data);
    } catch (error) {
      console.error("Error fetching disabled patients:", error);
    }
  }, []); // Dependencias vacías

  useEffect(() => {
    fetchPatients();
    fetchEnabledPatients();
    fetchDisabledPatients();
  }, [fetchPatients, fetchEnabledPatients, fetchDisabledPatients]); // Incluye las funciones memorizadas como dependencias

  useEffect(() => {
    fetchPatients(); // Esto se llama cuando el componente se monta y cuando fetchPatients cambia
  }, [fetchPatients]);

  const handleOpenDeleteModal = (patientId) => {
    setPatientToDelete(patientId);
    setOpenDeleteModal(true);
  };
  const deletePatient = async () => {
    if (patientToDelete) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/patients/${patientToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setPatients(
            patients.filter((patient) => patient.id !== patientToDelete)
          );
          toast.success("Paciente eliminado correctamente", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("Error al eliminar paciente", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
        toast.error("Error al eliminar paciente", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      setOpenDeleteModal(false);
      setPatientToDelete(null);
    }
  };

  // Filtrar pacientes basado en la pestaña activa
  const getFilteredPatients = () => {
    switch (activeTab) {
      case "enabled":
        return patients.filter((patient) => patient.status === "Active");
      case "disabled":
        return patients.filter((patient) => patient.status === "Inactive");
      default:
        return patients;
    }
  };

  const filteredPatients = getFilteredPatients().filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const disablePatient = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/patients/${patientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            disabled: true,
          }),
        }
      );

      if (response.ok) {
        const updatedPatients = patients.map((patient) =>
          patient.id === patientId ? { ...patient, disabled: true } : patient
        );
        setPatients(updatedPatients);
        toast.success("Paciente deshabilitado correctamente", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Error al deshabilitar al paciente", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error disabling patient:", error);
      toast.error("Error al deshabilitar al paciente", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const openEditModal = (patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdatePatient = async (updatedPatient) => {
    if (!updatedPatient.id) {
      console.error("Error: ID del paciente no definido");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/patients/${updatedPatient.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPatient),
        }
      );

      if (response.ok) {
        const updatedPatients = patients.map((patient) =>
          patient.id === updatedPatient.id ? updatedPatient : patient
        );
        setPatients(updatedPatients);
        toast.success("Paciente actualizado correctamente", {
          position: toast.POSITION.TOP_RIGHT,
        });
        closeEditModal();
      } else {
        toast.error("Error al actualizar paciente", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("Error al actualizar paciente", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  // // Filtered patients based on search term
  // const filteredPatients = patients.filter(patient =>
  //   patient.name.toLowerCase().includes(searchTerm.toLowerCase())

  // );

  const changePatientStatus = async (patientId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/patients/${patientId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const updatedPatients = patients.map((patient) =>
          patient.id === patientId ? { ...patient, status: newStatus } : patient
        );
        setPatients(updatedPatients);
        toast.success(
          `Paciente ${
            newStatus === "Active" ? "habilitado" : "deshabilitado"
          } correctamente`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else {
        toast.error("Error al cambiar el estado del paciente", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error al cambiar el estado del paciente:", error);
      toast.error("Error al cambiar el estado del paciente", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  // Filter patients based on active tab
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Pacientes
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Ver información sobre todos los pacientes
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <SearchIcon className="h-5 w-5 text-blue-gray-400" />
              <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              className="w-22 px-4 py-4"
              color="blue"
              onClick={openAddPatientPage} // Esta función debe llamar a navigate('/add-patient')
            >
              <MdAddCircle className="text-lg" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <div className="flex justify-between mb-4 space-x-2">
          <Button
            onClick={() => setActiveTab("all")}
            size="sm"
            className={`w-1/3 transition duration-300 ease-in-out ${
              activeTab === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600`}
          >
            <InformationCircleIcon className="h-5 w-5 inline mr-2 align-middle" />
            Todos
          </Button>
          <Button
            onClick={() => setActiveTab("enabled")}
            size="sm"
            className={`w-1/3 transition duration-300 ease-in-out ${
              activeTab === "enabled"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600`}
          >
            <EyeIcon className="h-5 w-5 inline mr-1 align-middle" />
            Habilitados
          </Button>
          <Button
            onClick={() => setActiveTab("disabled")}
            size="sm"
            className={`w-1/3 transition duration-300 ease-in-out ${
              activeTab === "disabled"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600`}
          >
            <TrashIcon className="h-5 w-5 inline mr-1 align-middle" />
            Deshabilitados
          </Button>
        </div>

        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr className="text-center">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => {
              const fullNamePatient = `${patient.name} ${
                patient.paternalLastName
              } ${patient.maternalLastName || ""}`.trim();
              const classes =
                index === filteredPatients.length - 0
                  ? "p-4"
                  : "p-4 border-b border-gay-200 text-center ";
              return (
                <tr key={patient.id} className={classes}>
                  <td>
                    <div className="flex items-center justify-center gap-2 w-full">
                      <div className="flex items-center gap-3 w-full">
                        <div className="rounded-full bg-blue-500 h-10 w-10 flex items-center justify-center">
                          <span className="font-medium text-sm text-white">
                            {patient.name[0]}
                          </span>
                        </div>
                        <span className="font-medium truncate">
                          {fullNamePatient}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td className="text-center">
                    {patient.status === "Active" ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-500 text-white">
                        Activo
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-red-500 text-white">
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td>
                    <Link to={`/content/${patient.id}`}>
                      <IconButton
                        className="p-1 cursor-pointer"
                        color="lightBlue"
                      >
                        <Tooltip title="View Details">
                          <InformationCircleIcon className="h-5 w-5 inline" />
                        </Tooltip>
                      </IconButton>
                    </Link>
                  </td>
                  <td>
                    <div className="flex flex-row items-center justify-center gap-2">
                    <IconButton
  color="blue"
  size="small"
  onClick={() => openEditPatientPage(patient)}
>
  <PencilIcon strokeWidth={2} className="h-4 w-4" />
</IconButton>
                      {patient.status === "Active" ? (
                        <Tooltip title="Deshabilitar">
                          <IconButton
                            color="red"
                            size="small"
                            onClick={() =>
                              changePatientStatus(patient.id, "Inactive")
                            }
                          >
                            <XIcon className="h-4 w-4 text-white" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Habilitar">
                          <IconButton
                            color="green"
                            size="small"
                            onClick={() =>
                              changePatientStatus(patient.id, "Active")
                            }
                          >
                            <CheckIcon className="h-4 w-4 text-white" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <IconButton
                        color="red"
                        size="small"
                        onClick={() => handleOpenDeleteModal(patient.id)}
                      >
                        <TrashIcon strokeWidth={2} className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter>
        <div className="flex justify-between">
          <Typography color="gray">
            Mostrando {filteredPatients.length} de {patients.length} Pacientes
          </Typography>
          <div className="flex gap-2">
            <Button size="sm" color="blue-gray" variant="outlined">
              Previous
            </Button>
            <Button size="sm" color="blue-gray" variant="outlined">
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={deletePatient}
      />
      {selectedPatient && (
        <EditPatientModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          patient={selectedPatient}
          onUpdate={handleUpdatePatient}
        />
      )}
    </Card>
  );
};

export default PatientList;
