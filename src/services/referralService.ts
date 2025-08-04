import { API_CONFIG, getAuthHeaders } from '@/config/api';
import { Referral } from '@/types/referral';

export class ReferralService {
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

    static async getMyReferrals(): Promise<Referral[]> {
        return this.request<Referral[]>('/refferals/coupons/my-referrals');
    }
}