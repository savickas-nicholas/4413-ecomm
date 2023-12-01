
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useOutletContext, useNavigate } from 'react-router-dom';

import http from '../../util/httpCaller';

export default function Comparison() {
  const [vehicle, setVehicle] = useState('');
  const [other, setOther] = useState([]);

  
  const toggleVehicle = () => {

  }

  const compare = () => {

  }

  return (
    <div>

    </div>
  );
}

