import React, { useCallback, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProduct';
import { useProductViewModal } from '../hooks/useProductViewModal';

const ViewProductCard = lazy(() => import('../components/ViewProductCard'));

const Products: React.FC = () => {
  const { products, loading } = useProducts(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const { selectedProduct, isOpenProductViewModal, openProductViewModal, closeProductViewModal } = useProductViewModal();

  const handleOpenCreateProduct = useCallback(() => {
    console.log('Navigating to manage products');
    navigate('/manage-products');
  }, [navigate]);

  if (loading) return <div className="text-center p-8">Loading products...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <p className="text-green-800 text-sm sm:text-base font-medium">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
            {user?.role === 'ADMIN' && (
              <button 
                className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap transform hover:scale-105"
                onClick={handleOpenCreateProduct}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Manage Products
              </button>
            )}
          </div>
        </div>
        <ProductGrid products={products} isShowEditButton={false} onClick={openProductViewModal} />
      </div>
      {isOpenProductViewModal && selectedProduct && (
        <Suspense fallback={<div>Loading...</div>}> 
          <ViewProductCard product={selectedProduct} onClose={closeProductViewModal} />
        </Suspense>
      )}
    </div>
  );
};

export default Products;