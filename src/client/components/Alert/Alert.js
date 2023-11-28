
import React from 'react';
import { Alert } from 'react-bootstrap';


export default function AlertComp({ message, alertState }) {  
  
  return alertState ? (
    <div className='center'>
      <Alert bsStyle={alertState}>
        {message}
      </Alert>
    </div>
  ) : (<div></div>)

}