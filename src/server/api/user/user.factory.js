
import { Factory } from 'rosie'; 

const UserFactory = new Factory()
  .sequence('k')
  .attr('name', ['k'], function(i) { return 'user' + i; })
  .attr('email', ['k'], function(i) { return 'user' + i + '@example.com'; })
  .attr('password', 'password')
  .attr('role', 'user')

export default UserFactory;
