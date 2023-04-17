import React, { useState, useEffect } from 'react';

const DistanceDisplay = () => {
  const [distance, setDistance] = useState(null);

  const fetchDistance = async () => {
    try {
      const response = await fetch('http://localhost:3001/getDistance');
      const data = await response.json();
      setDistance(data.distance);
    } catch (error) {
      console.error('Error fetching distance:', error);
    }
  };

  useEffect(() => {
    fetchDistance();
    const interval = setInterval(fetchDistance, 100); // Actualizar cada 1 segundo
    return () => clearInterval(interval);
  }, []);

  const getCirclePosition = () => {
    const maxDistance = 100;
    const distancePercent = (distance / maxDistance) * 100;
    const circlePosition = Math.min(distancePercent, 90);
    return circlePosition;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-200">
      <div className="relative h-72 w-72 rounded-full bg-gray-200">
        <div
          className="absolute h-12 w-12 bg-blue-500 rounded-full bottom-0 transform -translate-x-1/2"
          style={{ left: '50%', bottom: `${getCirclePosition()}%` }}
        ></div>
        <div className="absolute h-12 w-12 bg-red-500 rounded-full top-1/10 transform -translate-x-1/2"></div>
      </div>
      <div className="mt-8">
        {distance !== null ? <p className="text-2xl font-bold text-purple-800">{distance} cm</p> : <p className="text-xl text-gray-600">Cargando...</p>}
      </div>
    </div>
  );
};

export default DistanceDisplay;

