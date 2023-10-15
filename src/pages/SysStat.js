import React from 'react';
import { useAuth } from "../provider/authProvider";

import { Navigate } from "react-router-dom";

const SysStat = ({url}) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>Sys Stat</>
  );
};

export default SysStat;