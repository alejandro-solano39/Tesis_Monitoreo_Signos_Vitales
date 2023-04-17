import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: '2-digit',
    year: 'numeric',
    month: 'short',
  });

  return (
    <div className="text-white text-left flex flex-col justify-center items-end h-full">
      <div className="text-2xl font-bold">{time.toLocaleTimeString()}</div>
      <div className="text-1xl">{formattedDate}</div>
    </div>
  );
};

export default Clock;
