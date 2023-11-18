
import _ from 'lodash';

import Order from './order.model';


/* Search for order
*  user
*  status
*/
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(req.query)
      .sort({createdAt: 'asc'});
    return res.status(200).json({ orders });
  } catch(err) {
    return handleError(res, err);
  }
};


/* get all data for one order */
export const getOrderById = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id)
      .populate('vehicles');
    return res.status(200).json({ order });
  } catch(err) {
    return handleError(res, err);
  }
};


/* Create new database entry
*  price
*  deliveryDate
*  deliveryAddress
*  paymentToken
*  products
*  user
*/
export const addOrder = async (req, res) => {
  /* should perform validation of 'req.body' fields (e.g. must have Name/Email/Password) */
  
  try {
    let order = await Order.create(req.body);
    return res.status(201).json({ order });
  } catch(err) {
    return handleError(res, err);
  }
};

// update an existing order
export const updateOrder = async (req, res) => {
  try {
    let order = await Order.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {runValidators: true, new: true})
    .populate('vehicles')
    .populate('user', '_id name')
    return res.status(200).json({ order });
  } catch(err) {
    return handleError(res, err);
  }
};


/* delete an Order */
export const deleteOrder = async (req, res) => {
  try {
    await Order.findOneAndRemove({_id: req.params.id});
    return res.status(204).end();
  } catch(err) {
    return handleError(res, err);
  }
};

// generate sales report
export const getSalesReport = async (req, res) => {
  return res.status(204).end();
}


function handleError(res, err) {
  return res.status(404).send(err);
}
