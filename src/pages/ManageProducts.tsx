import React, { useEffect, useState } from 'react';
import CreateProductModal from '../components/CreateAndUpdateProductModal';
import { Product, ProductForm, CreateProductDto, UpdateProductDto } from '../types/Product';
import {createProduct, updateProduct} from '../services/ProductService';
import { generateUploadUrl } from '../services/UploadService';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/ProductService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

type Mode = 'create' | 'edit';

const ManageProducts: React.FC = () => {
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [mode, setMode] = useState<Mode>('create');

  const handleOpenEditProduct = (product: Product) => {
    console.log('Opening edit product modal for product:', product);
    setProductToEdit(product);
    setMode('edit');
    setShowCreateProductModal(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      console.log('Products fetched:', products);
      setProducts(products);
    };
    fetchProducts();
  }, []);
  const handleOpenCreateProduct = () => {
    setMode('create');
    setShowCreateProductModal(true);
  };

  const handleCloseCreateProductModal = () => {
    setProductToEdit(null);
    setShowCreateProductModal(false);
    setMode('create');
  };

  const uploadImagesToS3 = async (images: File[]) => {
    try {
      let imageUrls = [];
      for (const image of images) {
        if (image instanceof File) {
          console.log('Uploading image:', image.name);
      
          const fileExtension = image.name.split('.').pop();
          const uniqueKey = `products/${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${fileExtension}`;
      
          const uploadUrl = await generateUploadUrl(uniqueKey, image.type);
      
          const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            body: image,
            headers: {
              'Content-Type': image.type,
            },
          });
      
          if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(
              `Failed to upload image: ${uploadResponse.status} ${errorText}`
            );
          }
      
          // Store S3 key or public URL
          imageUrls.push(uniqueKey);
        } else if (typeof image === 'string') {
          // Already uploaded image
          imageUrls.push(image);
        }
      }
      return imageUrls;
    }
    catch (error) {
      console.error('Error uploading images to S3:', error);
      throw error;
    }
  }

  const handleEditProduct = async (product: ProductForm) => {
    try {
      setShowCreateProductModal(false);
      console.log("product.newImages", product.newImages);
      const imageUrls = await uploadImagesToS3(product.newImages);
      const newImageKeys = [...product.existingKeys, ...imageUrls];
      const productData: UpdateProductDto = {
        id: productToEdit?.id ?? '',
        name: product.name,
        price: product.price,
        description: product.description,
        image: newImageKeys ? newImageKeys : [],
      };
      const updateProductRes = await updateProduct(productData);
      console.log('Product updated successfully:', updateProductRes);
      alert('Product updated successfully!');
    } catch (error) {
      setIsLoading(false);
      setShowCreateProductModal(true);
      console.error('Error editing product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to edit product: ${errorMessage}`);
    }
  }

  const handleCreateProduct = async (product: ProductForm) => {
    try {
      setShowCreateProductModal(false);
      console.log('Creating product:', product);
      console.log("product", product);
      console.log("product.image", product.newImages);
      const imageUrls = await uploadImagesToS3(product.newImages);

      const productData: CreateProductDto = {
        name: product.name,
        price: product.price,
        description: product.description,
        image: imageUrls ? imageUrls : [],
      };
      
      console.log('Creating product in database:', productData);
      const response = await createProduct(productData);
      console.log('Product created successfully:', response);
      
      alert('Product created successfully!');
    } catch (error) {
      setIsLoading(false);
      setShowCreateProductModal(true);
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to create product: ${errorMessage}`);
    }
  }

  const handleSubmitProduct = async (product: ProductForm) => {
    try {
      setIsLoading(true);
      if (mode === 'create') {
        await handleCreateProduct(product);
      } else if (mode === 'edit') {
        await handleEditProduct(product);
      }
      setShowCreateProductModal(false);
      setIsLoading(false);
      setProductToEdit(null);
      setMode('create');
    } catch (error) {
      setIsLoading(false);
      setShowCreateProductModal(true);
      console.error('Error submitting product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to submit product: ${errorMessage}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Creating product...</p>
          </div>
        </div>
      )}
      
      {
        showCreateProductModal && (
          <CreateProductModal
            mode={mode}
            product={productToEdit ?? undefined}
            onClose={handleCloseCreateProductModal}
            onSubmit={handleSubmitProduct}
          />
        )
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <p className="text-green-800 text-sm sm:text-base font-medium">
                Manage products
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
                <ProductCard key={prod.id} product={prod} showEditButton={true} onEdit={handleOpenEditProduct} />
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

export default ManageProducts;