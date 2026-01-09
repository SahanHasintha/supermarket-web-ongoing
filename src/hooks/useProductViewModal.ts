import { useState, useCallback } from 'react';
import { Product } from '../types/Product';

export const useProductViewModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpenProductViewModal, setIsOpenProductViewModal] = useState(false);

  const openProductViewModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsOpenProductViewModal(true);
  }, []);

  const closeProductViewModal = useCallback(() => {
    setIsOpenProductViewModal(false);
    setSelectedProduct(null);
  }, []);

  return {
    selectedProduct,
    isOpenProductViewModal,
    openProductViewModal,
    closeProductViewModal,
  };
};
