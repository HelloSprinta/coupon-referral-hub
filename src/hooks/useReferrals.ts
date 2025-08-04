import { useState, useCallback } from 'react';
import { ReferralService } from '@/services/referralService';
import { Referral, ReferralStats } from '@/types/referral';

export const useReferrals = () => {
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReferrals = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await ReferralService.getMyReferrals();
            setReferrals(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener referidos');
            console.error('Error fetching referrals:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const stats: ReferralStats = {
        totalReferrals: referrals.length,
        activePayingCustomers: referrals.filter(r => r?.metrics?.isPayingCustomer && r?.metrics?.subscriptionStatus === 'Active').length,
        totalRevenue: referrals.reduce((sum, referral) => {
            return sum + (referral?.metrics?.isPayingCustomer ? (referral?.metrics?.planPrice || 0) : 0);
        }, 0),
        averageDaysSinceReferral: referrals.length > 0 
            ? referrals.reduce((sum, referral) => sum + (referral?.metrics?.daysSinceReferral || 0), 0) / referrals.length 
            : 0,
        conversionRate: referrals.length > 0 
            ? (referrals.filter(r => r?.metrics?.isPayingCustomer).length / referrals.length) * 100 
            : 0
    };

    return {
        referrals,
        loading,
        error,
        stats,
        fetchReferrals
    };
};