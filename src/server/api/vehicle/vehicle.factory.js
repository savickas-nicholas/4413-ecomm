//const Factory = require('rosie').Factory;
import { Factory } from 'rosie'; 

const VehicleFactory = new Factory()
  .sequence('id')
  .attr('name', ['id'], function(i) { return 'vehicle' + i; })
  .attr('description', ['id'], function(i) { return 'vehicle' + i; })
  .attr('brand', ['id'], function(i) { return 'vehicle' + i; })
  .attr('model', ['id'], function(i) { return 'vehicle' + i; })
  .attr('year', 2020)
  .attr('quantity', 10)
  .attr('price', 10000.0)
  .attr('activedeal', true)

export default VehicleFactory;
