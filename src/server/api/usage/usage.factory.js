import { Factory } from 'rosie'; 

const UsageFactory = new Factory()
  .sequence('k')
  .attr('date', new Date())
  .attr('userId', ['k'], function(i) { return 'userId' + i; })
  .attr('timeSpent', ['k'], function(i) { return i; })
  .attr('pageViewed', ['k'], function(i) { return 'pageViewed' + i; })

export default UsageFactory;