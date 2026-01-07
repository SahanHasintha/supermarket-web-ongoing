import { useState } from 'react'
import { Product } from '../types/Product'

interface ViewProductCardProps {
  product: Product;
  onClose: () => void;
}

const ViewProductCard = ({ product, onClose }: ViewProductCardProps) => {
  const { name, price, image, description } = product;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-hidden">
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-800">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            {image && image.length > 0 ? (
              <>
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_CDN_URL}/${image[selectedImageIndex]}`}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {image.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {image.map((imgKey, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? 'border-emerald-600 ring-2 ring-emerald-200'
                            : 'border-gray-200 hover:border-emerald-400'
                        }`}
                      >
                        <img
                          src={`${import.meta.env.VITE_CDN_URL}/${imgKey}`}
                          alt={`${name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
          </div>

          {/* Product Information Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{name}</h3>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Price</p>
              <p className="text-2xl font-bold text-emerald-600">${price.toFixed(2)}</p>
            </div>

            {description && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
              </div>
            )}

            {!description && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                <p className="text-gray-400 italic">No description available</p>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewProductCard