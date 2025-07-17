export { MetricCard } from './MetricCard';
export { EarningsChart } from './EarningsChart';
export { UsersChart } from './UsersChart';
export { TopCodesTable } from './TopCodesTable';
export { DashboardTab } from './DashboardTab';
export { ReferralsTab } from './ReferralsTab';
export { CodesTab } from './CodesTab';

// Tipos compartidos (opcional)
export interface ChartData {
    month: string;
    earnings: number;
    users: number;
}

export interface TopCode {
    code: string;
    users: number;
    earnings: number;
    conversion: string;
}

export interface ReferralCode {
    code: string;
    description: string;
    creationDate: string;
    referrals: number;
    firstLevelValue: number;
    totalCommission: number;
    trackingVolume: number;
    splitRate: string;
    status: string;
}

export interface Referral {
    uid: string;
    email: string;
    registrationDate: string;
    referralCode: string;
    verificationDate: string;
    firstDeposit: string;
    firstTrade: string;
    commission: string;
}