import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReferralStats as Stats } from '@/types/referral';
import { TrendingUp, Users, DollarSign, Calendar, Target } from 'lucide-react';

interface ReferralStatsProps {
    stats: Stats;
    loading?: boolean;
}

export const ReferralStats = ({ stats, loading }: ReferralStatsProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const formatPercentage = (value: number) => {
        return `${value.toFixed(1)}%`;
    };

    const formatDays = (days: number) => {
        return `${Math.round(days)} días`;
    };

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                        </CardHeader>
                        <CardContent>
                            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mb-1" />
                            <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Referidos
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalReferrals}</div>
                    <p className="text-xs text-muted-foreground">
                        Organizaciones que usaron tus cupones
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Clientes Activos
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.activePayingCustomers}</div>
                    <p className="text-xs text-muted-foreground">
                        Pagando actualmente
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Ingresos Mensuales
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">
                        De clientes referidos activos
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Promedio de Días
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatDays(stats.averageDaysSinceReferral)}</div>
                    <p className="text-xs text-muted-foreground">
                        Desde el primer referral
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Tasa de Conversión
                    </CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPercentage(stats.conversionRate)}</div>
                    <p className="text-xs text-muted-foreground">
                        Referidos que se volvieron clientes
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};