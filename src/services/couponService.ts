import { API_CONFIG, getAuthHeaders } from '@/config/api';
import { Coupon, CouponFormData } from '@/types/coupon';

export class CouponService {
    private static async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        return response.json();
    }

    static async getMyCoupons(): Promise<Coupon[]> {
        return this.request<Coupon[]>(API_CONFIG.ENDPOINTS.COUPONS.MY_COUPONS);
    }

    static async createCoupon(data: CouponFormData): Promise<Coupon> {
        return this.request<Coupon>(API_CONFIG.ENDPOINTS.COUPONS.CREATE, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async getCouponsByOrganization(organizationId: string): Promise<Coupon[]> {
        return this.request<Coupon[]>(
            `${API_CONFIG.ENDPOINTS.COUPONS.BY_ORGANIZATION}?organizationId=${organizationId}`
        );
    }

    static async getFormData(): Promise<any> {
        return this.request(API_CONFIG.ENDPOINTS.COUPONS.FORM_DATA);
    }
}
