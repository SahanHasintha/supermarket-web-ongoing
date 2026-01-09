import { memo } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';

interface ProductGridProps {
  products: Product[];
  isShowEditButton: boolean;
  onEdit?: (product: Product) => void;
  onClick?: (product: Product) => void;
}

const ProductGrid = ({ products, isShowEditButton, onEdit, onClick }: ProductGridProps) => {
  console.log('Rendering ProductGrid:', products.length);
  return (
    <>
    {products.length > 0 ? (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map(p => (
                    <ProductCard key={p.id} product={p} showEditButton={isShowEditButton} onEdit={onEdit} onClick={onClick}/>
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
            </div>
        )}
    </>
  );
};

export default memo(ProductGrid);
