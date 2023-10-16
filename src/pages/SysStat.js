import React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import { useAuth } from "../provider/authProvider";

function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

function secondsToDhms(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  // console.log(d, h, m, s)
  const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : ""
  const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : ""
  const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : ""
  const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : ""
  return dDisplay + hDisplay + mDisplay + sDisplay
}

const SysStat = ({url}) => {
  const timerRef = useRef(null);

  const { token } = useAuth();

  const [alertMessage, setAlertMessage] = useState();
  const [logout, setLogout] = useState(false);
  const [sysStat, setSysStat] = useState();

  const refresh = () => {
    const url_get = `${url.origin}/plugin/sys_stat`;
    axios.get(url_get)
      .then(function (response) {
        setSysStat(response.data);
      })
      .catch(function (err) {
        setAlertMessage(err.response.data);
        timerRef.current = setTimeout(() => {
          setLogout(true);
          setAlertMessage();
        }, 3000);
      });  
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (logout) {
    return <Navigate to="/logout" replace={true} />;
  }

  if (!sysStat) {
    return <>Please wait...</>;
  }

  const ac_power = (
    <Accordion.Item eventKey="ac_power">
      <Accordion.Header>AC Power</Accordion.Header>
      <Accordion.Body>
        <p>{sysStat.ac_power ? "Yes": "No"}</p>
      </Accordion.Body>
    </Accordion.Item>
  );

  const battert = (
    <Accordion.Item eventKey="battert">
      <Accordion.Header>Battery</Accordion.Header>
      <Accordion.Body>
        <p>Remaining Capacity: {round(sysStat.battery.remaining_capacity * 100)}%</p>
        <p>Remaining Time: {secondsToDhms(sysStat.battery.remaining_secs)}</p>
      </Accordion.Body>
    </Accordion.Item>
  );

  const boot_time = (
    <Accordion.Item eventKey="boot_time">
      <Accordion.Header>Boot Time</Accordion.Header>
      <Accordion.Body>
        <p>{sysStat.boot_time}</p>
      </Accordion.Body>
    </Accordion.Item>
  );

  const cpu_temp = (
    <Accordion.Item eventKey="cpu_temp">
      <Accordion.Header>CPU Temperature</Accordion.Header>
      <Accordion.Body>
        <p>{sysStat.cpu_temp} <span>&#176;</span>C</p>
      </Accordion.Body>
    </Accordion.Item>
  );

  const load_average = (
    <Accordion.Item eventKey="load_average">
      <Accordion.Header>Load Average</Accordion.Header>
      <Accordion.Body>
        <p>1 min: {round(sysStat.load_average.one)}</p>
        <p>5 mins: {round(sysStat.load_average.five)}</p>
        <p>15 mins: {round(sysStat.load_average.fifteen)}</p>
      </Accordion.Body>
    </Accordion.Item>
  );

  const mempry = (
    <Accordion.Item eventKey="memory">
      <Accordion.Header>Memory</Accordion.Header>
      <Accordion.Body>
        <p>Used {round(sysStat.memory.used / 1024 / 1024 / 1024)} G / {round(sysStat.memory.total / 1024 / 1024 / 1024)} G</p>
      </Accordion.Body>
    </Accordion.Item>
  );

  const uptime = (
    <Accordion.Item eventKey="6">
      <Accordion.Header>Uptime</Accordion.Header>
      <Accordion.Body>
        <p>{secondsToDhms(sysStat.uptime)}</p>
      </Accordion.Body>
    </Accordion.Item>
  );

  return (
    <>
      {
        alertMessage && 
        <Alert variant="danger" onClose={() => setAlertMessage()} dismissible>
          {alertMessage}
        </Alert>
      }
      <h1>Sys Stat</h1>
      <Accordion defaultActiveKey={[]} alwaysOpen>
        {ac_power}
        {battert}
        {boot_time}
        {cpu_temp}
        {load_average}
        {mempry}
        {uptime}
      </Accordion>
      <Button variant="dark" onClick={refresh}>Refresh</Button>
    </>
  );
};

export default SysStat;