import React from 'react';
import { Disclosure } from '@headlessui/react';
import { AiOutlineUser } from 'react-icons/ai';

const DoctorNotes = ({ notes }) => {
  return (
    <div className="bg-white flex flex-col max-w-sm mx-auto rounded-lg shadow-lg">
      <div>
        <img
          src="https://img.freepik.com/foto-gratis/joven-encantadora-sensual-escuchando-musica-auriculares_613910-14438.jpg?w=2000"
          alt="Usuario"
          className="w-full h-32 object-cover rounded-t-lg"
        />
      </div>
      <div className="bg-gray-900 mx-4 rounded-lg flex items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6">
        <AiOutlineUser className="text-white text-xl" />
        <h3 className="text-white text-lg font-semibold">Notas del doctor:</h3>
      </div>
      <div className="px-6 py-4 flex flex-col gap-2">
        <ul className="space-y-2">
          {notes.slice(0, 3).map((note, index) => (
            <li key={index} className="text-gray-700 rounded bg-gray-100 p-2">{note}</li>
          ))}
        </ul>
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full text-center border border-sky-600 text-sky-600 py-2 px-4 hover:bg-sky-600 hover:text-white rounded-xl transition-colors">
              {open ? 'Ocultar detalles' : 'Ver detalles'}
            </Disclosure.Button>
            <Disclosure.Panel className="mt-4 space-y-2 px-6">
              {notes.slice(3).map((note, index) => (
                <p key={index} className="text-gray-700 rounded bg-gray-100 p-2">{note}</p>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default DoctorNotes;
