import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ReviewSchema = new Schema({
  title: {
    type: String,
    maxLength: 100,
    required: 'You must provide a title.'
  },
  summary: {
    type: String,
    maxLength: 1000,
    required: 'You must provide feedback.'
  },
  rating: {
    type: Number,
  	min: 1,
  	max: 10,
    required: 'You must provide a rating.'
  }, 
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'This review must have a valid author.'
  },
  vehicle: {
    type: Schema.Types.ObjectId,
  	ref: 'Vehicle',
    required: 'This review must reference a valid vehicle.'
  },
}, {timestamps: true});

// maybe add validation to prevent user from submitting >1 review per vehicle

/*
* Virtual Methods
*/

//allows client to view shortened version
ReviewSchema.virtual('shortSummary').get(function() {
  let arr = this.summary.split(" ");
  arr = arr.slice(0, 10);
  let str = arr.join(" ");
  return str + "...";
})

/*
* Class Methods
*/

ReviewSchema.statics = {
  findReviewsByAuthor: function(authorId) {
    return this.find({author: authorId}, function(err, reviews) {
      if (err) {return err;}
      return reviews;
    });
  }
}


ReviewSchema.set('toJSON', {virtuals: true});

export default mongoose.model('Review', ReviewSchema);






/*prevents duplicate likes
ReviewSchema.pre("save", function(next) {

  function pushUnique(array, item) {
    if (array.indexOf(item) == -1) {
      array.push(item);
    }
    return false;
  }
});

  /*function checkForDuplicates() {
    var newUpvotes = [];
    this.upvotes.forEach((upvote) => {
      if(!pushUnique(newUpvotes, upvote)) {
        this.invalidate("author", "You have already liked this post!");
        done();
      }
    })
    return newUpvotes;
  }
  if(this.upvotes) {
    this.upvotes = checkForDuplicates();
  };*/
/*  next();
});*/



/*
mongoose.model(self.productType).findOne({_id: self.product}, function(err, product) {
    if(product) {
      if (product.reviews.indexOf(self._id) === -1) {
        product.reviews.push(self._id);
        product.save();
      }
    } else {
      next(err);
    }
  });

*/

 /*mongoose.model('Product').findOne({_id: self.product}, function(err, product) {
    if(err) {next(err);}
    if (product.reviews.indexOf(self._id) === -1) {
      product.reviews.push(self._id);
      product.save();
    }

  });*/


  /*function duplicates() {
    var i,
        len=this.upvotes.length,
        out=[],
        obj={};

    for (i=0;i<len;i++) {
      obj[this.upvotes[i]]=0;
    }
    for (i in obj) {
      out.push(i);
    }
    if (len === obj.length) {
      return false;
    } else {
      return true;
    }
  }*/
