// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../services/ProductService';

export const useProducts = (isAdmin: boolean) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching products');
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        console.log('Products fetched:', res);
        setProducts(res);
      } catch (e) {
        console.error('Failed to fetch products', e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAdmin]);
  

  return { products, loading };
};
