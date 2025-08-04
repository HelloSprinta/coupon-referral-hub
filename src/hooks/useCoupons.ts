import { useState, useCallback } from 'react';
import { CouponService } from '@/services/couponService';
import { Coupon, CouponFormData, CouponStats } from '@/types/coupon';
import { AuthService } from '@/services/authService';

const API_BASE_URL = 'http://localhost:5000';

export const useCoupons = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAuthHeaders = () => {
        const token = AuthService.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    const fetchCoupons = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/refferals/coupons/my-coupons`, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al obtener cupones');
            }

            const data = await response.json();
            setCoupons(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching coupons:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCoupon = useCallback(async (couponData: any): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/refferals/coupons`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(couponData)
            });

            if (!response.ok) {
                throw new Error('Error al crear cupón');
            }

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear cupón');
            console.error('Error creating coupon:', err);
            return false;
        }
    }, []);

    const stats = {
        totalCoupons: coupons.length,
        activeCoupons: coupons.filter(c => {
            const now = new Date();
            const endDate = c.end_date ? new Date(c.end_date) : null;
            return !endDate || endDate > now;
        }).length,
        totalViews: coupons.reduce((sum, coupon) => {
            // Simulate views based on coupon age and type
            const createdDate = new Date(coupon.created_at);
            const daysSinceCreated = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
            return sum + Math.max(10, daysSinceCreated * 5 + Math.floor(Math.random() * 50));
        }, 0),
        totalRevenue: coupons.reduce((sum, coupon) => {
            // Simulate revenue based on discount percentage and usage
            const baseRevenue = coupon.discount_percentage ? coupon.discount_percentage * 10 : 50;
            return sum + baseRevenue + Math.floor(Math.random() * 100);
        }, 0),
        freeUsers: 4, // Simulated data - replace with real data
        paidUsers: 2, // Simulated data - replace with real data
        conversionRate: 50 // Simulated data - replace with real data
    };

    return {
        coupons,
        loading,
        error,
        stats,
        fetchCoupons,
        createCoupon
    };
};