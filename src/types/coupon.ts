export interface Coupon {
    id: string;
    code: string;
    start_date?: string;
    end_date?: string;
    discount_percentage?: number;
    description?: string;
    created_at: string;
    organization_id?: string;
    organization?: {
        id: string;
        name: string;
    };
    days_validity_free?: number;
    days_validity_card?: number;
}

export interface CouponFormData {
    code: string;
    start_date?: string;
    end_date?: string;
    discount_percentage?: number;
    description?: string;
    organization_id?: string;
    days_validity_free?: number;
    days_validity_card?: number;
}

export interface CouponFilters {
    search: string;
    canal: string;
    tipoPlan: string;
    rangoIngresos: string;
    rangoFechas: {
        start: string;
        end: string;
    };
    estado: string;
}

export interface CouponStats {
    totalCoupons: number;
    activeCoupons: number;
    totalViews: number;
    totalRevenue: number;
}
