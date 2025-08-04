import { useEffect, useState } from 'react';
import { useReferrals } from '@/hooks/useReferrals';
import { ReferralCard } from './ReferralCard';
import { ReferralStats } from './ReferralStats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Referral } from '@/types/referral';

export const ReferralsList = () => {
    const { referrals, loading, error, stats, fetchReferrals } = useReferrals();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('recent');
    const [filteredReferrals, setFilteredReferrals] = useState<Referral[]>([]);

    useEffect(() => {
        fetchReferrals();
    }, [fetchReferrals]);

    useEffect(() => {
        let filtered = referrals.filter(referral => {
            const organizationName = referral?.referee_organization?.name || '';
            const couponCode = referral?.coupon?.code || '';
            const subscriptionStatus = referral?.metrics?.subscriptionStatus || 'free';
            
            const matchesSearch = organizationName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
                couponCode
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || 
                subscriptionStatus.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });

        // Sorting
        switch (sortBy) {
            case 'recent':
                filtered.sort((a, b) => {
                    const dateA = a?.date_redeemed ? new Date(a.date_redeemed).getTime() : 0;
                    const dateB = b?.date_redeemed ? new Date(b.date_redeemed).getTime() : 0;
                    return dateB - dateA;
                });
                break;
            case 'oldest':
                filtered.sort((a, b) => {
                    const dateA = a?.date_redeemed ? new Date(a.date_redeemed).getTime() : 0;
                    const dateB = b?.date_redeemed ? new Date(b.date_redeemed).getTime() : 0;
                    return dateA - dateB;
                });
                break;
            case 'revenue':
                filtered.sort((a, b) => (b?.metrics?.planPrice || 0) - (a?.metrics?.planPrice || 0));
                break;
            case 'name':
                filtered.sort((a, b) => {
                    const nameA = a?.referee_organization?.name || '';
                    const nameB = b?.referee_organization?.name || '';
                    return nameA.localeCompare(nameB);
                });
                break;
            default:
                break;
        }

        setFilteredReferrals(filtered);
    }, [referrals, searchTerm, statusFilter, sortBy]);

    const handleRefresh = () => {
        fetchReferrals();
    };

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                    <CardDescription>
                        Hubo un problema al cargar los referidos: {error}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleRefresh} variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reintentar
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Mis Referidos</h1>
                    <p className="text-muted-foreground">
                        Organizaciones que han usado tus cupones y sus métricas
                    </p>
                </div>
                <Button onClick={handleRefresh} disabled={loading} variant="outline">
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </Button>
            </div>

            {/* Stats */}
            <ReferralStats stats={stats} loading={loading} />

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                        <Filter className="w-5 h-5 mr-2" />
                        Filtros y Búsqueda
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre de organización o código de cupón..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="active">Activos</SelectItem>
                                <SelectItem value="trial">En prueba</SelectItem>
                                <SelectItem value="free">Gratis</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Ordenar por" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Más recientes</SelectItem>
                                <SelectItem value="oldest">Más antiguos</SelectItem>
                                <SelectItem value="revenue">Mayor ingresos</SelectItem>
                                <SelectItem value="name">Nombre A-Z</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            {loading && filteredReferrals.length === 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : filteredReferrals.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-8">
                        <div className="text-muted-foreground">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'No se encontraron referidos con los filtros aplicados.' 
                                : 'Aún no tienes referidos. Comparte tus cupones para empezar a generar referencias.'}
                        </div>
                        {(searchTerm || statusFilter !== 'all') && (
                            <Button 
                                variant="outline" 
                                className="mt-4"
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                }}
                            >
                                Limpiar filtros
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">
                            Mostrando {filteredReferrals.length} de {referrals.length} referidos
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredReferrals.map((referral) => (
                            <ReferralCard key={referral.user_referrals_id} referral={referral} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};