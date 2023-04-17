import React from 'react';
import Clock from './Clock';
import UserMenu from './UserMenu';
import WeatherComponent from './WeatherComponent';

const Navbar = ({ userName }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 backdrop-blur-md">
      <div className="flex items-center">
        <Clock />
        <div className="mx-4">
          <WeatherComponent/>
        </div>
      </div>
      <UserMenu userName={userName} />
      <div className="absolute inset-0 z-[-1] bg-black opacity-50"></div>
    </div>
  );
};

export default Navbar;
