
import React from 'react';
import { Alert } from 'react-bootstrap';

// success, warning, info, danger
export default function AlertComp({ message, alertState }) {  
  
  return alertState ? (
    <div className='center'>
      <Alert variant={alertState}>
        {message}
      </Alert>
    </div>
  ) : (<div></div>)

}