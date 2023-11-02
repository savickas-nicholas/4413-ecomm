
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

export default mongoose.model('Order', OrderSchema);
