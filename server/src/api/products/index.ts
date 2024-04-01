import { Router } from "express";
import Product from "./model";

const router = Router();

router.get("/", (req, res) => {
  Product.findAll()
    .then((products: Product[]) => {
      res.status(200).json(products);
    })
    .catch((err: Error) => {
      console.error("Error occurred during connection with db: ", err);
      res.status(500).json();
    });
});

export default router;
