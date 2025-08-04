import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Referral } from '@/types/referral';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReferralCardProps {
    referral: Referral;
}

export const ReferralCard = ({ referral }: ReferralCardProps) => {
    const { referee_organization, coupon, metrics, date_redeemed } = referral;

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Active':
                return 'default';
            case 'Trial':
                return 'secondary';
            case 'Free':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            {referee_organization?.name || 'Organización no disponible'}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Cupón usado: <span className="font-medium">{coupon?.code || 'N/A'}</span>
                        </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(metrics?.subscriptionStatus || 'Free')}>
                        {metrics?.subscriptionStatus || 'Free'}
                    </Badge>
                </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Plan Actual</p>
                        <p className="text-sm">{metrics?.currentPlan || 'No disponible'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Precio Mensual</p>
                        <p className="text-sm font-semibold">
                            {metrics?.isPayingCustomer 
                                ? formatCurrency(metrics?.planPrice || 0)
                                : 'Gratis'
                            }
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Bots Activos</p>
                        <p className="text-sm">{metrics?.botCount || 0}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Días desde referral</p>
                        <p className="text-sm">{metrics?.daysSinceReferral || 0} días</p>
                    </div>
                </div>

                <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Cupón canjeado</span>
                        <span>
                            {date_redeemed ? formatDistanceToNow(parseISO(date_redeemed), { 
                                addSuffix: true, 
                                locale: es 
                            }) : 'Fecha no disponible'}
                        </span>
                    </div>
                    <div className="mt-1">
                        <p className="text-xs text-muted-foreground">
                            Descuento: {coupon?.discount_percentage || 0}% - {coupon?.description || 'Sin descripción'}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};