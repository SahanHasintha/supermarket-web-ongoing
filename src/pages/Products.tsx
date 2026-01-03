import React, { useEffect, useState } from 'react';
import CreateProductModal from '../components/CreateProductModal';
import { CreateProductDto, Product } from '../types/Product';
import {createProduct} from '../services/ProductService';
import { generateUploadUrl } from '../services/UploadService';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/ProductService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Products: React.FC = () => {
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      console.log('Products fetched:', products);
      setProducts(products);
    };
    fetchProducts();
  }, []);
  const handleOpenCreateProduct = () => {
    setShowCreateProductModal(true);
  };

  const handleCloseCreateProductModal = () => {
    setShowCreateProductModal(false);
  };

  const handleCreateProduct = async (product: CreateProductDto) => {
    try {
      console.log('Creating product:', product);
      
      let imageUrl = '';
      
      // If there's an image file, upload it to S3 first
      if (product.image && product.image instanceof File) {
        console.log('Uploading image:', product.image.name);
        
        // Generate a unique key for the file
        const fileExtension = product.image.name.split('.').pop();
        const uniqueKey = `products/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
        
        // Get the presigned upload URL
        const uploadUrl = await generateUploadUrl(uniqueKey, product.image.type);
        console.log('Upload URL generated:', uploadUrl);
        
        // Upload the file to S3
        console.log('Uploading with Content-Type:', product.image.type);
        console.log('File size:', product.image.size);
        
        console.log('Content-Type', product.image.type);
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: product.image,
          headers: {
            'Content-Type': product.image.type,
          },
        });
        
        console.log('Upload response status:', uploadResponse.status);
        console.log('Upload response headers:', Object.fromEntries(uploadResponse.headers.entries()));
        
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error('Upload error details:', errorText);
          throw new Error(`Failed to upload image: ${uploadResponse.status} ${uploadResponse.statusText} - ${errorText}`);
        }
        console.log("upload response ", uploadResponse);
        console.log('Image uploaded successfully');
        
        // Construct the public URL (you might need to adjust this based on your S3 setup)
        imageUrl = `${uniqueKey}`;
      } else if (product.image && typeof product.image === 'string') {
        // If image is already a URL string, use it directly
        imageUrl = product.image;
      }
      
      // Create the product with the image URL
      const productData = {
        name: product.name,
        price: product.price,
        description: product.description,
        image: imageUrl || undefined,
      };
      
      console.log('Creating product in database:', productData);
      const response = await createProduct(productData);
      console.log('Product created successfully:', response);
      
      // Close the modal on success
      setShowCreateProductModal(false);
      
      // You might want to show a success message here
      alert('Product created successfully!');
      
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to create product: ${errorMessage}`);
    }
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {
        showCreateProductModal && (
          <CreateProductModal
            onClose={handleCloseCreateProductModal}
            onCreate={handleCreateProduct}
          />
        )
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-orange-600 bg-clip-text text-transparent mb-2">
                Our Products
              </h1>
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
                Create Product
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map(prod => (
                <ProductCard key={prod.id} product={prod} />
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
    </div>
  );
};

export default Products;