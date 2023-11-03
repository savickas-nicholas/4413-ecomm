//const Factory = require('rosie').Factory;
import { Factory } from 'rosie'; 

const VehicleFactory = new Factory()
  .sequence('k')
  .attr('name', ['k'], function(i) { return 'vehicle' + i; })
  .attr('description', ['k'], function(i) { return 'vehicle' + i; })
  .attr('brand', ['k'], function(i) { return 'vehicle' + i; })
  .attr('model', ['k'], function(i) { return 'vehicle' + i; })
  .attr('year', 2020)
  .attr('quantity', 10)
  .attr('price', 10000.0)
  .attr('activedeal', true)

export default VehicleFactory;
