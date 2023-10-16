import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Wol = ({url}) => {
  function handleClick() {
    const url_get = `${url.origin}/plugin/wol/nas`;
    axios.get(url_get)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <>
      <h1>Wake on LAN</h1>
      <Button variant="dark" onClick={handleClick}>LinDS</Button>
    </>
  );
};

export default Wol;