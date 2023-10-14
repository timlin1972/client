import React from 'react';

const About = ({url}) => {
  return (
    <>
    About<br/>
        IP address: {url.host}
    </>
  );
};

export default About;