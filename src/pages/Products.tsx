import React, { useState } from 'react';
import CreateProductModal from '../components/CreateProductModal';
import { Product } from '../types/Product';
import {createProduct} from '../services/ProductService';
import { generateUploadUrl } from '../services/UploadService';

const Products: React.FC = () => {
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);

  const handleOpenCreateProduct = () => {
    setShowCreateProductModal(true);
  };

  const handleCloseCreateProductModal = () => {
    setShowCreateProductModal(false);
  };

  const handleCreateProduct = async (product: Product) => {
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
        
        console.log('Image uploaded successfully');
        
        // Construct the public URL (you might need to adjust this based on your S3 setup)
        imageUrl = `https://your-bucket-name.s3.amazonaws.com/${uniqueKey}`;
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {
        showCreateProductModal && (
          <CreateProductModal
            onClose={handleCloseCreateProductModal}
            onCreate={handleCreateProduct}
          />
        )
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800">
            Products
          </h1>
          <button 
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
          onClick={handleOpenCreateProduct}
          >
            Create Product
          </button>
        </div>
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <p className="text-xl text-gray-600">
            Products page coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;

