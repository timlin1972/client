import './App.css';

import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './sidebar';

function App() {
  const url = new URL(window.location.href);
  const ipAddress = url.hostname;

  return (
    <Router>
      <div className="App">
        <Sidebar ipAddress={ipAddress}/>
      </div>
    </Router>
  );
}

export default App;
