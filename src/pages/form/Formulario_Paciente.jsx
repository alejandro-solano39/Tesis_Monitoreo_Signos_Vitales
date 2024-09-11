import React, { useState } from 'react';
import { Slider, PatientList } from '../components';

function ViewPatients() {
 
  return (
    <div className="bg-gradient-to-b from-blue-200 full-screen">
      <div className="h-screen w-screen flex overflow-x-hidden">
        <div className="fixed">
          <Slider />
        </div>

        <div className="ml-80 w-full h-screen overflow-y-auto">
          <div className="border border-gray-300 shadow-lg bg-white p-6 rounded-xl my-6 mx-6">
            <PatientForm />
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewPatients;
