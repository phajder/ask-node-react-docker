import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const chunks: Buffer[] = [];
  while (true) {
    chunks.push(Buffer.alloc(1024 * 1024));
  }
});

export default router;
