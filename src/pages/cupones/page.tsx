'use client';

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PopularCoupons } from '@/components/cupones/PopularCoupons';
import { CouponsFilters } from '@/components/cupones/CouponsFilters';
import { CouponsTable } from '@/components/cupones/CouponsTable';
import { CreateCouponModal } from '@/components/cupones/CreateCouponModal';
import { ReferralsList } from '@/components/referrals/ReferralsList';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { useCoupons } from '@/hooks/useCoupons';

interface OutletContext {
    activeTab: string;
}

export default function CuponesPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        canal: 'todos',
        tipoPlan: 'todos',
        rangoIngresos: 'todos',
        rangoFechas: { start: '', end: '' },
        estado: 'todos'
    });

    const { activeTab } = useOutletContext<OutletContext>();

    const {
        coupons,
        loading,
        fetchCoupons,
        createCoupon,
        error
    } = useCoupons();

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const handleCreateCoupon = async (couponData: any) => {
        const success = await createCoupon(couponData);
        if (success) {
            setShowCreateModal(false);
            fetchCoupons(); // Refrescar lista
        }
    };

    const filteredCoupons = React.useMemo(() => {
        return coupons.filter(coupon => {
            // Filtro de búsqueda
            if (filters.search && !coupon.code.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // Filtro de canal
            if (filters.canal !== 'todos' && coupon.channel !== filters.canal) {
                return false;
            }

            // Filtro de estado
            if (filters.estado !== 'todos') {
                const now = new Date();
                const endDate = coupon.end_date ? new Date(coupon.end_date) : null;
                const isExpired = endDate && endDate < now;

                if (filters.estado === 'activo' && isExpired) return false;
                if (filters.estado === 'expirado' && !isExpired) return false;
            }

            // Filtro de fechas
            if (filters.rangoFechas.start && coupon.start_date) {
                const startDate = new Date(coupon.start_date);
                const filterStart = new Date(filters.rangoFechas.start);
                if (startDate < filterStart) return false;
            }

            if (filters.rangoFechas.end && coupon.end_date) {
                const endDate = new Date(coupon.end_date);
                const filterEnd = new Date(filters.rangoFechas.end);
                if (endDate > filterEnd) return false;
            }

            return true;
        });
    }, [coupons, filters]);

    // Renderizar contenido según la pestaña activa
    const renderTabContent = () => {
        switch (activeTab) {
            case 'cupones':
                return (
                    <>
                        {/* Sección Más Populares */}
                        <PopularCoupons onCreateClick={() => setShowCreateModal(true)} />

                        {/* Título de la sección de análisis */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Análisis completo de cupones y conversiones por canal digital
                            </h2>
                        </div>

                        {/* Filtros */}
                        <CouponsFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                            totalResults={filteredCoupons.length}
                        />

                        {/* Tabla */}
                        <CouponsTable
                            coupons={filteredCoupons}
                            loading={loading}
                            onRefresh={fetchCoupons}
                        />
                    </>
                );

            case 'sprinter':
                return <DashboardContent />;

            case 'referidos':
                return <ReferralsList />;

            case 'retiros':
                return (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Retiros y Pagos</h3>
                        <p className="text-gray-600">Contenido de Retiros y Pagos próximamente</p>
                    </div>
                );

            case 'analisis':
                return (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis y Seguimiento</h3>
                        <p className="text-gray-600">Contenido de Análisis y Seguimiento próximamente</p>
                    </div>
                );

            default:
                return (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona una pestaña</h3>
                        <p className="text-gray-600">El contenido se mostrará aquí</p>
                    </div>
                );
        }
    };

    return (
        <>
            {renderTabContent()}

            {/* Modal de creación */}
            {showCreateModal && (
                <CreateCouponModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateCoupon}
                />
            )}
        </>
    );
}