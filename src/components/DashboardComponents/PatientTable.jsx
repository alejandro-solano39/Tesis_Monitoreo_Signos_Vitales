import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function createData(name, age, gender, status, imageUrl) {
  return { name, age, gender, status, imageUrl };
}

const rows = [
  createData('John Doe', 28, 'Male', 'Stable', 'https://via.placeholder.com/40'),
  createData('Jane Smith', 45, 'Female', 'Critical', 'https://via.placeholder.com/40'),
  createData('Bob Johnson', 62, 'Male', 'Stable', 'https://via.placeholder.com/40'),
  createData('Alice Williams', 34, 'Female', 'Serious', 'https://via.placeholder.com/40'),
  createData('David Davis', 56, 'Male', 'Stable', 'https://via.placeholder.com/40'),
];

function PatientTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Pacientes</h2>
      <TableContainer component={Paper} className="rounded-xl overflow-hidden">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Edad</TableCell>
              <TableCell align="right">Género</TableCell>
              <TableCell align="right">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} className="hover:bg-gray-100">
                <TableCell>
                  <Avatar alt={row.name} src={row.imageUrl} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4">
        <button className="border border-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white rounded-xl transition-colors duration-200">
          Ver todos los pacientes
        </button>
      </div>
    </div>
  );
}

export default PatientTable;
