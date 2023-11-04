
import { Factory } from 'rosie'; 

const OrderFactory = new Factory()
  .sequence('k')
  .attr('price', ['k'], function(i) { return 1000 + i; })
  .attr('deliveryDate', Date.now())
  .attr('deliveryAddress', '4700 Keele St, Toronto, ON M3J 1P3')
  .attr('paymentToken', 'sdfsdfghdfgdfg')
  .attr('vehicles')
  .attr('user')

export default OrderFactory;
