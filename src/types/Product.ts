export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  image?: File | string;
}

export interface Product extends CreateProductDto {
  id: string;
}