

import React, { useState, useEffect } from 'react';


export default function LoanCalculator({ propPrice }) {
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState(12);
  const [rate, setRate] = useState(10);
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState();


  // calculate price change whenever any component changes
  useEffect(() => {
    calculatePayment();
  },[price, period, rate, downPayment])

  // update price if prop is provided
  useEffect(() => {
    setPrice(propPrice);
  },[propPrice])




  const updatePrice = (val) => {
    if(val < 0) {
      val = 0;
    }

    setPrice(val);
    calculatePayment();
  }

  const updatePeriod = (val) => {
    if(val < 0) {
      val = 0;
    }

    setPeriod(val);
    calculatePayment();
  }

  const updateRate = (val) => {
    if(val < 0) {
      val = 0;
    }

    setRate(val);
    calculatePayment();
  }

  const updateDownPayment = (val) => {
    if(val < 0) {
      val = 0;
    }
    if(val > price) {
      val = price;
    }

    setDownPayment(val);
    calculatePayment();
  }


  //PV=PMTi[1−1(1+i)n]
  const calculatePayment = () => {
    let remainder = price - downPayment;
    let interestRate = rate / 1200;
    let factor = Math.pow(interestRate + 1, period);

    let payment;
    if(rate > 0) {
      payment = (remainder * interestRate * factor) / (factor - 1)
    } else {
      payment = remainder / period;
    }

    setMonthlyPayment(payment.toFixed(2));
  }

  return (
    <div className='loanContainer'>
      <h4>Loan Calculator</h4>
      <div className='flex-row'>
        <div className='flex-column'>
          <div>
            <div class="form-group">
              <label htmlFor='price'>Price:</label>
              <input type='number' id='price' className="form-control" min='0'
                value={price} onChange={(e) => updatePrice(e.target.value) } />
            </div>
          </div>
          <div>
            <div class="form-group">
              <label htmlFor='period'>Period (in months)</label>
              <input type='number' id='period' className="form-control" min='0'
                value={period} onChange={(e) => updatePeriod(e.target.value) } />
            </div>
          </div>
        </div>
        <div className='flex-column'>
          <div>
            <div class="form-group">
              <label htmlFor='rate'>Interest Rate (%)</label>
              <input type='number' id='rate' className="form-control" min='0'
                value={rate} onChange={(e) => updateRate(e.target.value) } />
            </div>
          </div>
          <div>
            <div class="form-group">
              <label htmlFor='downPayment'>Down Payment</label>
              <input type='number' id='downPayment' className="form-control" min='0' max={price}
                value={downPayment} onChange={(e) => updateDownPayment(e.target.value) } />
            </div>
          </div>
        </div>
        <div className='flex-centered fill border rounded'>
          <div className='fw-bold'>Monthly Payment</div>
            <div>${ monthlyPayment || 'NA' }</div>
        </div>
      </div>
    </div>
  );
}


