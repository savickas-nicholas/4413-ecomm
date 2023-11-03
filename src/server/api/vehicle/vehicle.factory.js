//const Factory = require('rosie').Factory;
import { Factory } from 'rosie'; 

const VehicleFactory = new Factory()
  .attr('name', 'vehicle')
  .attr('description', 'vehicle')
  .attr('brand', 'vehicle')
  .attr('model', 'vehicle')
  .attr('year', 2020)
  .attr('quantity', 10)
  .attr('price', 10000.0)
  .attr('activedeal', true)

export default VehicleFactory;
