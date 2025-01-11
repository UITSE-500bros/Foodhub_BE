import supabaseClient from "./postgresql.service";

class CouponsService {
    private instance: any;
    private table = 'coupons';
    constructor() {
        this.instance = supabaseClient.getInstance();
    }

    async applyCoupon(coupon_code: string) {
        const { data, error } = await this.instance.from(this.table).select('discount_value').eq('coupon_code', coupon_code);
        if (error) throw error;
        return data;

    }
    async getCoupons() {
        const { data, error } = await this.instance.from(this.table).select('created_at, updated_at, coupon_code, coupon_name, discount_value, expire_at, coupon_count');
        if (error) throw error;
        return data;
    }
}

const couponsService = new CouponsService();
export default couponsService;