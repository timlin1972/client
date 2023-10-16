
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuth } from "./provider/authProvider";
import Sidebar from './Sidebar';
import Login from './pages/Login';
import SysStat from './pages/SysStat';
import Wol from './pages/Wol';
import About from './pages/About';
import Logout from './pages/Logout';
import Shutdown from './pages/Shutdown';

function Home() {
    const url = new URL(window.location.href);
    const { token } = useAuth();

    return (
        <BrowserRouter>
            <div className="App">
                <Container fluid>
                    <Row>
                        {token &&
                        <Col md={3}>
                            <Sidebar url={url}/>
                        </Col>
                        }
                        <Col md={9}>
                            <Routes>
                                <Route path='/' element={<SysStat url={url}/>} />
                                <Route path='/login' element={<Login url={url}/>} />
                                <Route path='/sysstat' element={<SysStat url={url}/>} />
                                <Route path='/wol' element={<Wol url={url}/>} />
                                <Route path='/shutdown' element={<Shutdown url={url}/>} />
                                <Route path='/about' element={<About url={url}/>} />
                                <Route path='/logout' element={<Logout url={url}/>} />
                                <Route path='*' element={<SysStat url={url}/>} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </div>
        </BrowserRouter>
    );
  }
  
  export default Home;
  