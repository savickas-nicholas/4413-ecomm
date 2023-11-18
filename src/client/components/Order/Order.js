import React from 'react';


export default function Order() {

  return (
    <div>
      <div>Order Summary</div>

      <div>Items Purchased</div>
      <ul>
        <li>
          <div>
            <h4>Vehicle</h4>
            <image>Referenced Image</image>
            <div>
              <div>Brand name, model & year</div>
              <div>Mileage</div>
              <div>Customizations</div>
            </div>
          </div>
        </li>

        <li>
          <div>
            <h4>Vehicle</h4>
            <img>Referenced Image</img>
            <div>
              <div>Brand name, model & year</div>
              <div>Mileage</div>
              <div>Customizations</div>
            </div>
          </div>
        </li>
      </ul>

      <div>
        <div>
          <div>Shipped to address at date</div>
          <div>Status of shipment</div>
        </div>

        <div>
          <div>Order details</div>
          <div>Purchase Subtotal: $</div>
          <div>Shipping and Handling: $</div>
          <div>Cost before tax: $</div>
          <div>Total Cost: $</div>
        </div>
      </div>

      <div>
        <div>Payment Details</div>
        <div>Stored Credit Cards</div>
        <ol>
          <li>
            <div>
              <div>Credit Card Company</div>
              <div>Credit Card Number</div>
              <div>Credit Card Expiration</div>
            </div>
          </li>
        </ol>
      </div>

      <button>Place Order</button>

      <div>
        <h2>Loan Calculator</h2>
        <form>
          <label for="loan">Loan Amount</label>
          <input type="text" name="loan"></input>
          <label for="int">Interest Amount</label>
          <input type="text" name="int"></input>
          <label for="term">Loan Term</label>
          <input type="text" name="term"></input>
        </form>

        <div>
          <h5>Loan Estimate: $</h5>
        </div>
      </div>
    </div>
  );
}
