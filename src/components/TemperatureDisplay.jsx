import React, { useState, useEffect } from "react";
import axios from "axios";

const TemperatureDisplay = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/temperature");
        setTemperature(response.data.temperature);
      } catch (error) {
        console.error("Error fetching temperature:", error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Actualiza cada segundo
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Temperature</h2>
      <p>{temperature ? `${temperature.toFixed(2)} °C` : "Loading..."}</p>
    </div>
  );
};

export default TemperatureDisplay;
