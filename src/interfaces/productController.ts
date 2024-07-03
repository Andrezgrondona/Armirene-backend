import { Request, Response } from 'express';
import { loadProducts, saveProducts } from '../infraestructure/JsonStorage';
import { Product } from '../domain/Product';

export const listProducts = (req: Request, res: Response): void => {
  const products = loadProducts();
  res.json(products);
};

export const addProduct = (req: Request, res: Response): void => {
  const products = loadProducts();
  const newProduct: Product = req.body;
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
};

export const updateProduct = (req: Request, res: Response): void => {
  const products = loadProducts();
  const productId = req.params.productId;
  const updatedProduct = req.body;
  const index = products.findIndex(p => p.id === productId);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(products);
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const deleteProduct = (req: Request, res: Response): void => {
  const products = loadProducts();
  const productId = req.params.productId;
  const index = products.findIndex(p => p.id === productId);

  if (index !== -1) {
    products.splice(index, 1);
    saveProducts(products);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
