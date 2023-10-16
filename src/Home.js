
import { NavLink } from 'react-router-dom';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuth } from "./provider/authProvider";
import Login from './pages/Login';
import SysStat from './pages/SysStat';
import Reg from './pages/Reg';
import Wol from './pages/Wol';
import About from './pages/About';
import Logout from './pages/Logout';
import Shutdown from './pages/Shutdown';

function Home() {
    const url = new URL(window.location.href);
    const { token } = useAuth();

    const routes = (
        <Routes>
            <Route path='/' element={<SysStat url={url}/>} />
            <Route path='/login' element={<Login url={url}/>} />
            <Route path='/sysstat' element={<SysStat url={url}/>} />
            <Route path='/reg' element={<Reg url={url}/>} />
            <Route path='/wol' element={<Wol url={url}/>} />
            <Route path='/shutdown' element={<Shutdown url={url}/>} />
            <Route path='/about' element={<About url={url}/>} />
            <Route path='/logout' element={<Logout url={url}/>} />
            <Route path='*' element={<SysStat url={url}/>} />
        </Routes>
    );

    const with_sidebar = (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <h2>Center</h2>
                        <p><small>{url.host}</small></p>

                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li class="nav-item">
                                <NavLink exact to="/sysstat" activeClassName="activeClicked">
                                    Sys Stat
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink exact to="/reg" activeClassName="activeClicked">
                                    Plugins
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink exact to="/wol" activeClassName="activeClicked">
                                    Wake on LAN
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink exact to="/shutdown" activeClassName="activeClicked">
                                    Shutdown
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink exact to="/about" activeClassName="activeClicked">
                                    About
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink exact to="/logout" activeClassName="activeClicked">
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                        <hr/>
                        <div class="pb-4">
                            <span class="d-none d-sm-inline mx-1">Tim Lin</span>
                        </div>
                    </div>
                </div>
                <div class="col py-3">
                    {routes}
                </div>
            </div>
        </div>
    );

    if (token) {
        return (
            <BrowserRouter>
                <div className="App">
                    {with_sidebar}
                </div>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <div className="App">
                {routes}
            </div>
        </BrowserRouter>
    );
}
  
export default Home;
