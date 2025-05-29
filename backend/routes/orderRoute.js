import { placeOrder, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;
