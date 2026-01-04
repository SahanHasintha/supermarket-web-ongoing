import { CreateProductDto } from '../types/Product';
import api from './api';

const createProduct = async (product: CreateProductDto) => {
  console.log("create product service")
  const response = await api.post('/products', product);
  return response.data;
};

const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export {createProduct, getProducts};