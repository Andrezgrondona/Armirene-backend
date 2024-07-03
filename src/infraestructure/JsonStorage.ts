import { Product } from '../domain/Product';
import fs from 'fs';

const PRODUCTS_FILE = 'products.json';

export const loadProducts = (): Product[] => {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  return JSON.parse(data);
};

export const saveProducts = (products: Product[]): void => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};


