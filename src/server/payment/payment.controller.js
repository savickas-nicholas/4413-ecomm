
import { getCache } from '../cache';

/**
 * validate payment
 */
export const processPayment = async (req, res) => {
  let cache = getCache();
  
  const { cardNumber, nameOnCard, authCode } = req.body;
  if(!cardNumber || !nameOnCard || !authCode) {
    return res.status(404).json({ message: "Mandatory parameters are missing." })
  }

  let counter = await cache.get("paymentCounter");
  if(!counter) {
    counter = 0;
  }

  if(counter < 2) {
    await cache.set("paymentCounter", counter + 1)
    return res.status(200).json({ message: "Payment Approved." });
  } else {
    await cache.set("paymentCounter", 0)
    return res.status(404).json({ message: 'Credit Card Authorization Failed.' });
  }
};

