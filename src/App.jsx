import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './components/AppContent';

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastContainer theme="dark" />
    </Router>
  );
};

export default App;
