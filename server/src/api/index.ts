import { Router, Request, Response, NextFunction } from "express";
import productsRouter from "./products";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    text: "Hello world!",
    params: req.query,
  });
});

router.use("/products", productsRouter);

router.use((req: Request, res: Response, next: NextFunction) =>
  res.status(404).send({
    error: "Not found!",
  }),
);

export default router;
