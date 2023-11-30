
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
*  vehicles
*  user
*/
export const addOrder = async (req, res) => {
  /* should perform validation of 'req.body' fields (e.g. must have Name/Email/Password) */
  console.log(req.body);

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
  // expects dates to be in ISO string format yyyy-mm-dd
  const { startDate, endDate } = req.body;

  try {
    const startDateTimestamp = Date.parse(startDate);
    const startDateObj = new Date(startDateTimestamp);

    const endDateTimestamp = Date.parse(endDate);
    const endDateObj = new Date(endDateTimestamp);

    const orders = await Order.find({})
        .gte('createdAt', startDateObj)
        .lte('createdAt', endDateObj)
        .populate('vehicles');

    let totalVehiclesSold = 0;
    let totalHotDealsSold = 0;
    let totalSales = 0;
    let salesByBrand = {};
    for(let o of orders) {
      totalSales += o.price;
      for(let v of o.vehicles){
        totalVehiclesSold += 1;
        salesByBrand[v.brand] = salesByBrand[v.brand] ? salesByBrand[v.brand] + 1 : 1

        if(v.activeDeal === true) {
          totalHotDealsSold += 1;
        }
      }
    }

    let statistics = {
      totalVehiclesSold,
      totalHotDealsSold,
      totalSales, 
      salesByBrand,
    }
    
    return res.status(200).json({ statistics });
  } catch (err) {
    return handleError(res, err);
  }
}


function handleError(res, err) {
  return res.status(404).send(err);
}
