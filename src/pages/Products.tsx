import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/ProductService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

const ViewProductCard = lazy(() => import('../components/ViewProductCard'));

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [showViewProductModal, setShowViewProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      console.log('Products fetched:', products);
      setProducts(products);
    };
    fetchProducts();
  }, []);
  const handleOpenCreateProduct = () => {
    console.log('Navigating to manage products');
    navigate('/manage-products');
  };

  const handleProductClick = useCallback((product: Product) => {
    console.log('Product clicked:', product);
    setSelectedProduct(product);
    setShowViewProductModal(true);
  }, []);


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

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map(prod => (
                <ProductCard key={prod.id} product={prod} showEditButton={false} onClick={handleProductClick}/>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-2 border-green-200 p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-green-700 to-orange-600 bg-clip-text text-transparent mb-2">No products yet</h3>
            <p className="text-green-800 mb-6">Start by adding your first product to the catalog.</p>
            {user?.role === 'ADMIN' && (
              <button 
                className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105"
                onClick={handleOpenCreateProduct}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Product
              </button>
            )}
          </div>
        )}
      </div>
      {showViewProductModal && selectedProduct && (
        <Suspense fallback={<div>Loading...</div>}> 
          <ViewProductCard product={selectedProduct} onClose={() => setShowViewProductModal(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default Products;