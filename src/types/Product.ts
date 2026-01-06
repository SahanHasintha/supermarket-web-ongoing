export interface ProductForm {
  name: string;
  price: number;
  description?: string;

  // NEW
  newImages: File[];
  existingKeys: string[];
  removedKeys: string[];
}

export interface CreateProductDto {
  name: string;
  price: number;
  image: string[]; // uploaded URLs/keys
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string[];
  description?: string;
}