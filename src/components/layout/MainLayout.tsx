import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CouponsStats } from '@/components/cupones/CouponsStats';
import { CouponsTabs } from '@/components/cupones/CouponsTabs';
import { useCoupons } from '@/hooks/useCoupons';

export const MainLayout = () => {
    const location = useLocation();
    
    // Mapear rutas a pestañas
    const getTabFromRoute = (pathname: string) => {
        switch (pathname) {
            case '/dashboard':
            case '/sprinter':
                return 'sprinter';
            case '/cupones':
                return 'cupones';
            case '/referidos':
                return 'referidos';
            case '/retiros':
                return 'retiros';
            case '/analisis':
                return 'analisis';
            default:
                return 'cupones';
        }
    };

    const [activeTab, setActiveTab] = useState(getTabFromRoute(location.pathname));
    
    const {
        stats,
        loading,
        fetchCoupons
    } = useCoupons();

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    // Actualizar pestaña cuando cambie la ruta
    useEffect(() => {
        setActiveTab(getTabFromRoute(location.pathname));
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Global */}
            <Header />
            
            {/* Stats y Tabs Globales */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats globales */}
                <CouponsStats stats={stats} loading={loading} />
                
                {/* Tabs globales */}
                <CouponsTabs 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                />
                
                {/* Contenido dinámico basado en el tab activo */}
                <div className="mt-6">
                    <Outlet context={{ activeTab }} />
                </div>
            </div>
        </div>
    );
};