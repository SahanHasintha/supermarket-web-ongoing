import React from 'react';
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  showEditButton: boolean;
  onEdit?: (product: Product) => void;
  onClick?: (product: Product) => void;
}

const ProductCard = ({ product, showEditButton, onEdit, onClick }: ProductCardProps) => {
  const { name, price, image } = product;
  console.log('Rendering ProductCard:', product.id);
  return (
    <div 
      className="group w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 hover:border-green-300"
    >
      <div className="relative overflow-hidden bg-gray-50">
        <img 
          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" 
          src={`${import.meta.env.VITE_CDN_URL}/${image[0]}`} 
          alt={name} 
        />
        {showEditButton && onEdit && (
        <div className="absolute top-2 left-2" onClick={() => onEdit?.(product)}>
          <div className="flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors cursor-pointer">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
        )}
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full shadow-sm">
            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
            </svg>
            <span className="text-[10px] font-semibold text-gray-700">4.8</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow cursor-pointer" 
        onClick={() => onClick?.(product)}
        >
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {name}
        </h3>
        
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">${price}</span>
            </div>
            <button 
              type="button" 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductCard)