import { axiosSecure } from '../../hooks/useAxiosSecure';

export const createPaymentIntent = async (amount) => {
  const res = await axiosSecure.post('/payments/create-payment-intent', { amount });
  return res.data;
};

export const savePayment = async (paymentData) => {
  const res = await axiosSecure.post('/payments/payments', paymentData);
  return res.data;
};

export const getPayments = async (params) => {
  const res = await axiosSecure.get('/payments', { params });
  return res.data;
};
