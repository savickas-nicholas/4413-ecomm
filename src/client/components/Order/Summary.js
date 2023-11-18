import React from 'react';


export default function Summary() {

  return (
    <div>
        <div>Hello UserName,</div>
        <div>
            <h4>Order Summary</h4>
            <div>Vehicle</div>
            <img src="">Reference Image</img>

            <div>
                <div>
                    <div>Shipped to address at date</div>
                    <div>Status of shipment</div>

                    <button>Write a Review</button>
                    <button>Cancel Order</button>
                </div>

                <div>
                    <div>Shipping and Handling: $</div>
                    <div>Cost before tax: $</div>
                    <div>Total Cost: $</div>
                </div>
            </div>
        </div>
    </div>
  );
}
