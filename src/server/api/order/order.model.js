
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const statuses = ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

export const OrderSchema = new Schema({

  price: {
    type: Number,
    required: true
  },
  deliveryDate: {
    type: Date, 
    required: true
  },
  deliveryAddress: {
    type: String, 
    required: true
  },
  paymentToken: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },

  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }, 

}, { timestamps: true });

/**
 * Validations
 */

// Validate empty email without using 'required: true' (which would fail when using OAuth)
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true; // always returns 'true' if using OAuth
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password without using 'required: true' (which would fail when using OAuth)
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true; // always returns 'true' if using OAuth
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(email) {
    //console.log('email --> ', email);
    mongoose.model('User')
      .findOne({email: email})
      .then((user) => {
        const outcome = !user;
        //console.log('validation outcome --> ', outcome);
        return outcome;
      }).catch((err) => {
        throw err;
      });
}, 'The specified email address is already in use.');



/**
 * PRE and POST Hooks
 */

const validatePresenceOf = function(value) {
  return value && value.length;
};

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();
  if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
    next(new Error('Invalid password'));
  else
    next();
});

UserSchema.pre('remove', (next) => {
  next();
})

/**
 * Instance Methods
 */

UserSchema.methods = {
  /** Authenticate - check if the passwords are the same **/
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /** Generate a cryptographic 'salt' **/
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /** Encrypt password **/
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }
};


/**
* Virtual Methods
**/

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('public')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

UserSchema.set('toJSON',  { virtuals: true });

export default mongoose.model('Order', OrderSchema);