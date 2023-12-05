import React, { useState, useRef } from 'react';
import Spinner from "../assets/Spinner";
import CameraComponent from "../components/CameraComponent";
import { CameraIcon, VideoCameraIcon, ArrowsExpandIcon } from "@heroicons/react/solid";

const UserProfile = ({ patient }) => {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const videoRef = useRef(null);
    
    if (!patient) {
        return <Spinner />;
    }

    const toggleCamera = () => {
        setIsCameraOn(!isCameraOn);
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
                videoRef.current.msRequestFullscreen();
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Concatenación del nombre completo
    const fullName = `${patient.name} ${patient.paternalLastName}`;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:space-x-4">
                {/* Datos del usuario */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Información Paciente</h2>
                    <div className="space-y-4">
                        <InfoRow label="Nombre:" value={fullName} />
                        <InfoRow label="Edad:" value={patient.age} />
                        <InfoRow label="Fecha de Nacimiento:" value={formatDate(patient.birthdate)} />
                        <InfoRow label="Género:" value={patient.gender} />
                        <InfoRow label="Estatus:" value={patient.status} />
                        <InfoRow label="CURP:" value={patient.CURP} />
                    </div>
                </div>

                {/* Componente de la cámara y botones */}
                <div className="container mx-auto p-4">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden">
                    <CameraComponent isCameraOn={isCameraOn} videoRef={videoRef} />
                </div>
                    <div className="flex justify-around mt-4 w-full">
                        <button onClick={toggleCamera} className="bg-blue-500 text-white rounded-full p-1">
                            {isCameraOn ? (
                                <VideoCameraIcon className="w-4 h-4" />
                            ) : (
                                <CameraIcon className="w-4 h-4" />
                            )}
                        </button>
                        <button onClick={toggleFullscreen} className="bg-green-500 text-white rounded-full p-1">
                            <ArrowsExpandIcon className="w-4 h-4" />
                        </button>
                    </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div>
        <h3 className="font-semibold text-blue-700">{label}</h3>
        <p className="text-gray-600">{value}</p>
    </div>
);

export default UserProfile;
