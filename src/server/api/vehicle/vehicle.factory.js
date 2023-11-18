
import { Factory } from 'rosie'; 

const VehicleFactory = new Factory()
  .sequence('k')
  .attr('name', ['k'], function(i) { return 'vehicle' + i; })
  .attr('description', ['k'], function(i) { return 'vehicle' + i; })
  .attr('brand', ['k'], function(i) { return 'vehicle' + i; })
  .attr('model', ['k'], function(i) { return 'vehicle' + i; })
  .attr('year', ['k'], function(i) { return 2020 + i; } )
  .attr('price', ['k'], function(i) { return 10000.0 + (i * 10000.0); } )
  .attr('quantity', 10)
  .attr('activedeal', true)

export default VehicleFactory;
