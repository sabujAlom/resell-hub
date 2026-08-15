import { axiosSecure } from '../../hooks/useAxiosSecure';

export const getOrders = async (params) => {
  const res = await axiosSecure.get('/orders', { params });
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await axiosSecure.post('/orders', orderData);
  return res.data;
};

export const updateOrder = async (id, orderData) => {
  const res = await axiosSecure.patch(`/orders/${id}`, orderData);
  return res.data;
};
