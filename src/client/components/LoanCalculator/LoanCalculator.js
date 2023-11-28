

import React, { useState, useEffect } from 'react';


export default function LoanCalculator({ propPrice }) {
  const [price, setPrice] = useState(propPrice || 0);
  const [period, setPeriod] = useState(12);
  const [rate, setRate] = useState(10);
  const [downPayment, setDownPayment] = useState();
  const [monthyPayment, setMonthlyPayment] = useState(null);

  return (
    <div className='loanContainer'>
      <h4>Loan Calculator</h4>
      <div className='flex-row'>
        <div className='flex-column'>
          <div>
            <div class="form-group">
              <label htmlFor='price'>Price:</label>
              <input type='number' id='price' className="form-control" />
            </div>
          </div>
          <div>
            <div class="form-group">
              <label htmlFor='period'>Period (in months)</label>
              <input type='number' id='period' className="form-control"  />
            </div>
          </div>
        </div>
        <div className='flex-column'>
          <div>
            <div class="form-group">
              <label htmlFor='rate'>Interest Rate (%)</label>
              <input type='number' id='rate' className="form-control" />
            </div>
          </div>
          <div>
            <div class="form-group">
              <label htmlFor='downPayment'>Down Payment</label>
              <input type='number' id='downPayment' className="form-control" />
            </div>
          </div>
        </div>
        <div className='flex-column'>
          <div>Monthly Payment: { monthyPayment || 'NA' }</div>
        </div>
      </div>
    </div>
  );
}


