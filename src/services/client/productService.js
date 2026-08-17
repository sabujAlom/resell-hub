import axios from 'axios';
import { axiosSecure } from '../../hooks/useAxiosSecure';

export const getProducts = async (params) => {
  const res = await axios.get(`/api/products`, { params });
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`/api/products/${id}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axiosSecure.post('/products', productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axiosSecure.patch(`/products/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosSecure.delete(`/products/${id}`);
  return res.data;
};
