import { Router } from "express";
import couponController from "../controllers/coupon.controller";

const couponRoute = Router();
couponRoute.get("/", couponController.getAllCoupons);
couponRoute.post("/apply", couponController.applyCoupon);

export default couponRoute;