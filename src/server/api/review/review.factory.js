import { Factory } from 'rosie';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

let sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt orci nulla, sed fermentum ipsum dictum vitae. Vestibulum lacus felis, ullamcorper vel urna vel, mattis luctus nibh. Fusce iaculis, eros sed ultricies rutrum, dui enim lobortis metus, ac condimentum tortor quam at est. Donec dignissim nisi ut arcu ornare, eget malesuada nibh vulputate. Phasellus quis pharetra nunc, in convallis velit. Donec ultricies leo vel nisl volutpat, in faucibus diam venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi non ex ipsum. Vestibulum faucibus interdum erat ut rhoncus. Etiam semper eget nulla ac sodales. Quisque et cursus dui. Nulla vehicula mattis feugiat. Quisque elit metus, tempus vitae magna nec, pulvinar mollis nisl. Proin et nulla eu lorem sollicitudin scelerisque vulputate ac erat. Vestibulum sapien lorem, vulputate vitae dapibus vel, ultricies fringilla turpis. Donec vestibulum egestas nisl, in dignissim eros vehicula non. Nunc leo odio, cursus id venenatis eget, suscipit quis magna. Phasellus iaculis nibh id molestie accumsan. Phasellus ultrices dictum sapien, a venenatis felis aliquet sed. Integer pulvinar maximus ligula, a vestibulum neque luctus nec. Integer mattis diam ex, cursus tempor purus laoreet ut. Suspendisse et metus vel justo molestie bibendum. Aliquam erat volutpat. Sed mollis purus justo, et porttitor sapien ullamcorper at. Donec imperdiet felis nec mauris tincidunt rhoncus. Aenean at ligula vitae felis posuere elementum eu ut leo. Donec in ante non tellus finibus semper sed sed nulla. Duis ornare sit amet augue eleifend tempus. Nulla erat ante, ultrices ac placerat et, varius ac nulla. Duis elementum nisl ut sem viverra pellentesque. Sed neque dolor, ultricies quis ornare interdum, auctor quis quam. Nulla convallis diam tellus. Curabitur malesuada eros eget ex bibendum luctus. Etiam cursus rhoncus orci quis consectetur. Nam at mollis dolor, id bibendum tortor. Maecenas sed sollicitudin odio. Ut lacinia tristique mauris, eu eleifend turpis convallis quis. Nulla a tellus eget neque malesuada ullamcorper eget nec tortor. Vivamus elementum lacus a hendrerit semper. Vivamus efficitur, lorem eget accumsan facilisis, metus purus facilisis odio, vitae vehicula erat lorem in felis. Nulla in massa metus. Morbi eget sem venenatis, posuere tellus quis, sodales purus. Suspendisse vulputate quis urna sed tempus. Donec id odio ac lacus sodales ultricies. Morbi aliquet turpis non augue varius placerat. Praesent finibus malesuada ligula a efficitur. Proin nisl augue, tempor nec pulvinar eget, ultricies vitae risus. Sed mattis non velit et scelerisque. Vivamus magna neque, dignissim ut rutrum vitae, pellentesque at massa. Proin cursus sagittis dolor vel scelerisque. Praesent vel velit in nibh pulvinar imperdiet vitae vel nulla. Vivamus pellentesque quis velit eu scelerisque. Duis eu imperdiet arcu, eu dapibus nibh. Pellentesque vitae euismod turpis. Fusce rutrum gravida neque in finibus. Duis hendrerit vehicula eleifend. Aliquam erat volutpat.`;

let textArr = sampleText.split(' ');

const ReviewFactory = Factory.define('review')
  .sequence('id')
  .attr('rating', function() {
    return getRandomArbitrary(1, 10);
  })
  .attr('summary', function() {
    let startingIdx = getRandomArbitrary(0, textArr.length - 10);
    let arrSplice = textArr.splice(startingIdx, 10);
    let strRep = arrSplice.join(' ');
    return strRep;
  })
  .attr('title', 'Bot Review')
  .attr('product')
  .attr('author')

export default ReviewFactory;
