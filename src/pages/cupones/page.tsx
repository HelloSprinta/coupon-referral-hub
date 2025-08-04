'use client';

import React, { useState, useEffect } from 'react';
import { CouponsStats } from '@/components/cupones/CouponsStats';
import { CouponsTabs } from '@/components/cupones/CouponsTabs';
import { PopularCoupons } from '@/components/cupones/PopularCoupons';
import { CouponsFilters } from '@/components/cupones/CouponsFilters';
import { CouponsTable } from '@/components/cupones/CouponsTable';
import { CreateCouponModal } from '@/components/cupones/CreateCouponModal';
import { useCoupons } from '@/hooks/useCoupons';

export default function CuponesPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeTab, setActiveTab] = useState('cupones');
    const [filters, setFilters] = useState({
        search: '',
        canal: 'todos',
        tipoPlan: 'todos',
        rangoIngresos: 'todos',
        rangoFechas: { start: '', end: '' },
        estado: 'todos'
    });

    const {
        coupons,
        loading,
        stats,
        fetchCoupons,
        createCoupon,
        error
    } = useCoupons();

    useEffect(() => {
        fetchCoupons();
    }, []);

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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats con Ranking */}
                <CouponsStats stats={stats} loading={loading} />


                {/* Pestañas de navegación */}
                <CouponsTabs 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                />

                {/* Contenido condicional según la pestaña activa */}
                {activeTab === 'cupones' && (
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
                )}

                {/* Placeholders para otras pestañas */}
                {activeTab === 'sprinter' && (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sprinter</h3>
                        <p className="text-gray-600">Contenido de Sprinter próximamente</p>
                    </div>
                )}

                {activeTab === 'referidos' && (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Referidos</h3>
                        <p className="text-gray-600">Contenido de Referidos próximamente</p>
                    </div>
                )}

                {activeTab === 'retiros' && (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Retiros y Pagos</h3>
                        <p className="text-gray-600">Contenido de Retiros y Pagos próximamente</p>
                    </div>
                )}

                {activeTab === 'analisis' && (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis y Seguimiento</h3>
                        <p className="text-gray-600">Contenido de Análisis y Seguimiento próximamente</p>
                    </div>
                )}

                {/* Modal de creación */}
                {showCreateModal && (
                    <CreateCouponModal
                        onClose={() => setShowCreateModal(false)}
                        onSubmit={handleCreateCoupon}
                    />
                )}
        </div>
    );
}