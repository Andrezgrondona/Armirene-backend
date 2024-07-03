import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const purchasesFilePath = path.join(dataDir, 'purchases.json');


const ensurePurchasesFileExists = () => {
  if (!fs.existsSync(purchasesFilePath)) {
    fs.writeFileSync(purchasesFilePath, JSON.stringify([]));
  }
};


const readPurchasesFromFile = () => {
  ensurePurchasesFileExists();
  const data = fs.readFileSync(purchasesFilePath, 'utf-8');
  return JSON.parse(data);
};


const writePurchasesToFile = (purchases: any) => {
  ensurePurchasesFileExists();
  fs.writeFileSync(purchasesFilePath, JSON.stringify(purchases, null, 2));
};

export const purchaseItems = (req: Request, res: Response) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const purchases = readPurchasesFromFile();
  const newPurchase = {
    id: Date.now().toString(),
    items: cart,
    date: new Date().toISOString(),
  };

  purchases.push(newPurchase);
  writePurchasesToFile(purchases);

  res.status(201).json(newPurchase);
};
