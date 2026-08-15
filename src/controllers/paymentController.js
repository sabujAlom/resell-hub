import { createPaymentIntentService } from '../services/server/stripeService.js';
import { findPayments, savePaymentRecord } from '../services/server/paymentService.js';

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Valid amount is required" });
    }
    const paymentIntent = await createPaymentIntentService(amount);
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (req, res, next) => {
  try {
    const { transactionId, orderId, productId, buyerId, amount, paymentMethod } = req.body;
    
    const newPayment = {
      transactionId,
      orderId,
      productId,
      buyerId,
      amount: parseFloat(amount),
      paymentStatus: 'paid',
      paymentMethod: paymentMethod || 'card',
      paymentDate: new Date()
    };
    
    const result = await savePaymentRecord(newPayment);
    if (result.duplicate) {
      return res.status(200).json({ success: true, paymentId: result.insertedId, message: "Payment already processed", payment: newPayment });
    }
    
    res.status(201).json({ success: true, paymentId: result.insertedId, payment: newPayment });
  } catch (error) {
    next(error);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const { buyerId } = req.query;
    const query = {};
    if (buyerId) {
      query.buyerId = buyerId;
    }
    
    if (!buyerId && req.user && req.user.role === 'buyer') {
      query.buyerId = req.user.id || req.user._id;
    }
    
    const payments = await findPayments(query);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};
