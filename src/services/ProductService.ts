import { Product } from '../types/Product';
import api from './api';

const createProduct = async (product: Product) => {
  const response = await api.post('/products', product);
  return response.data;
};

export {createProduct};