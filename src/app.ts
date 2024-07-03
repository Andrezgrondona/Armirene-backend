import express from "express";
import cors from "cors";

import { purchaseItems } from "./interfaces/purchaseController";
import {
  addProduct,
  deleteProduct,
  listProducts,
} from "./interfaces/productController";

const app = express();
app.use(express.json());

// Configuración de CORS para permitir solicitudes desde http://localhost:3001
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/products", listProducts);
app.post("/products", addProduct);
app.delete("/products/:productId", deleteProduct);

app.post("/purchase", purchaseItems);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
