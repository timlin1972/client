import './App.css';

import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from './sidebar';
import SysStat from './pages/SysStat';
import Wol from './pages/Wol';
import About from './pages/About';

function App() {
  const url = new URL(window.location.href);

  return (
    <BrowserRouter>
      <div className="App">
        <Container fluid>
          <Row>
            <Col>
              <Sidebar url={url}/>
            </Col>
        <Col>
        <Routes>
            <Route path='/' element={<SysStat url={url}/>} />
            <Route path='/sysstat' element={<SysStat url={url}/>} />
            <Route path='/wol' element={<Wol url={url}/>} />
            <Route path='/about' element={<About url={url}/>} />
            <Route path='*' element={<SysStat url={url}/>} />
        </Routes>
        </Col>
        </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
