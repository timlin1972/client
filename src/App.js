import './App.css';

import React from 'react';

import AuthProvider from './provider/authProvider';
import Home from './Home';

function App() {
  return (
    <AuthProvider>
      <Home/>
    </AuthProvider>
  );
}

export default App;
