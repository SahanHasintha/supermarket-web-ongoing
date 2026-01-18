import {memo, useEffect, useState} from 'react';
import { Product, ProductForm } from '../types/Product';

type ProductModalMode = 'create' | 'edit';

interface ProductModalProps {
  mode: ProductModalMode;
  product?: Product;
  onClose: () => void;
  onSubmit: (data: ProductForm) => void;
}

const CreateAndUpdateProductModal = ({  mode, product, onClose, onSubmit } : ProductModalProps) => {
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    price: 0,
    description: '',
    newImages: [],
    existingKeys: [],
    removedKeys: [],
  });

  useEffect(() => {
    if (mode === 'edit' && product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        newImages: [],
        existingKeys: product.images.map(img => img.url),
        removedKeys: [],
      });
    }
  
    if (mode === 'create') {
      setFormData({
        name: '',
        price: 0,
        description: '',
        newImages: [],
        existingKeys: [],
        removedKeys: [],
      });
    }
  }, [mode, product]);
  

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImage(Array.from(e.target.files || []) as File[]);
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, newImages: Array.from(e.target.files || []) as File[] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-800">Create Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter product description"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              multiple={true}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required = {mode === 'create'}
            />

            <div className="grid grid-cols-3 gap-3">
              {formData.existingKeys.map((key) => (
                <div key={key} className="relative">
                  <img
                    src={`${import.meta.env.VITE_CDN_URL}/${key}`}
                    className="w-full h-24 object-cover rounded"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, existingKeys: prev.existingKeys.filter(k => k !== key), removedKeys: [...prev.removedKeys, key] }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              {mode === 'create' ? 'Create Product' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateAndUpdateProductModal);