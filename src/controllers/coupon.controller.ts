import couponsService from "../services/coupons.service";

class CouponController {
    async applyCoupon(req, res) {
        try {
            const coupon_code = req.body.coupon_code;
            if (!coupon_code) {
                return res.status(400).json({ message: 'Coupon code is required' });
            }
            const coupon = await couponsService.applyCoupon(coupon_code);
            if (!coupon.length) {
                return res.status(404).json({ message: 'Coupon not found' });
            }
            return res.status(200).json(coupon[0]);
        } catch (error) {
            console.error('Error in applyCoupon:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async getAllCoupons(req, res) {
        try {
            const coupons = await couponsService.getCoupons();
            return res.status(200).json(coupons);
        } catch (error) {
            console.error('Error in getAllCoupons:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
const couponController = new CouponController();
export default couponController;