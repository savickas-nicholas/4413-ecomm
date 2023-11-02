
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


export const Customization = new Schema({
  description: {
    type: String, 
    required: true
  },
  additionalCost: {
    type: Number, 
    required: true
  }
})

export const Review = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  summary: {
    type: String, 
    required: true
  },
  rating: {
    type: Number, 
    required: true
  }
})


export const VehicleSchema = new Schema({
  
  // e.g. Civic
  model: {
    type: String,
    required: true
  },

  // manufacturer, e.g. Honda
  brand: {
    type: String,
    required: true
  },

  // e.g. SUV vs Coupe vs Sedan
  type: {
    type: String,
    required: true
  },

  // e.g. 2020
  year: {
    type: String,
    required: true
  },

  // e.g. 200k
  mileage: {
    type: Number,
    required: true
  },

  // e.g. 20k
  basePrice: {
    type: Number, 
    required: true
  },

  // maybe image 

  reviews: [Review],

  // damage reports, e.g. accident on {date} caused side door damage
  history: [String],

  // e.g. { 'V8 4L', 10k }
  customizations: [Customization],

  // ???
  hotDeal: {
    type: Boolean,
    default: false
  }

});

export default mongoose.model('Vehicle', VehicleSchema);
