import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = ({url}) => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Center
            <p><sub><small>{url.host}</small></sub></p>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/sysstat" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Sys Stat</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/wol" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hammer">Wake on LAN</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/shutdown" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hammer">Shutdown</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/about" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">About</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Logout</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Tim Lin
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;