import React from 'react';


export default function Catalog() {

  return (
    <div>
        <h1>
            Vehicles Catalog
        </h1>

        <div>
            <div>
                <div>
                    <label>Search Vehicle Name</label>
                    <input type="text"></input>
                </div>
                <button>Filter by Price</button>
                <button>Filter by Brand</button>
                <button>Filter by Mileage</button>
                <button>Filter by Hot Deals</button>
            </div>
            <table>
                <tr>
                    <th>Vehicle</th>
                    <th>Quantity Available</th>
                </tr>
                <tr>
                    <td>
                        <div>
                            <h4>Vehicle</h4>
                            <img alt="Referenced Image"></img>
                            <p>Vehicle Description</p>
                            <div>
                                <div>Brand name, model & year</div>
                                <div>Mileage</div>
                                <div>
                                    <h4>Customizations</h4>
                                    <div>Current condition</div>
                                    <div>Colour and trim</div>
                                    <div>Custom engine</div>
                                </div>
                            </div>

                            <button>Compare Vehicle</button>
                        </div>
                    </td>
                    
                    <td>
                        <div>
                            <div>Quantity Available</div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div>
            <h4>Vehicle Recommendation</h4>
            <form>
                <label for="price">Price</label>
                <input type="text" name="price"></input>
                <label for="year">Year</label>
                <input type="text" name="year"></input>
                <label for="brand">Brand</label>
                <input type="text" name="brand"></input>
                <label for="miles">Miles</label>
                <input type="text" name="miles"></input>

                <button type="submit">Get Recommendation</button>
            </form>
        </div>
    </div>
  );
}


