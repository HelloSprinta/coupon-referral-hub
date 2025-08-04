export interface ReferralMetrics {
    daysSinceReferral: number;
    botCount: number;
    isPayingCustomer: boolean;
    currentPlan: string;
    planPrice: number;
    subscriptionStatus: 'Active' | 'Free' | 'Trial';
}

export interface ReferralOrganization {
    id: string;
    name: string;
    created_at: string;
}

export interface ReferralCoupon {
    id: string;
    code: string;
    description: string;
    discount_percentage: number;
    created_at: string;
    organization: {
        id: string;
        name: string;
    };
}

export interface Referral {
    user_referrals_id: string;
    organization_id: string;
    coupon_id: string;
    referee_id: string;
    referer_id: string;
    redeemed: boolean;
    date_redeemed: string;
    updated_at: string;
    coupon: ReferralCoupon;
    referee_organization: ReferralOrganization;
    metrics: ReferralMetrics;
}

export interface ReferralStats {
    totalReferrals: number;
    activePayingCustomers: number;
    totalRevenue: number;
    averageDaysSinceReferral: number;
    conversionRate: number;
}