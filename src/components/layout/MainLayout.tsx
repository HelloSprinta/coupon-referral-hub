import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
    Ticket, 
    Users, 
    CreditCard, 
    BarChart3, 
    LogOut,
    Zap
} from 'lucide-react';
import { AuthService } from '@/services/authService';

interface NavigationItem {
    id: string;
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
    {
        id: 'sprinter',
        label: 'Sprinter',
        path: '/dashboard',
        icon: Zap
    },
    {
        id: 'cupones',
        label: 'Cupones',
        path: '/cupones',
        icon: Ticket
    },
    {
        id: 'referidos',
        label: 'Referidos',
        path: '/referidos',
        icon: Users
    },
    {
        id: 'retiros',
        label: 'Retiros y Pagos',
        path: '/retiros',
        icon: CreditCard
    },
    {
        id: 'analisis',
        label: 'Análisis y Seguimiento',
        path: '/analisis',
        icon: BarChart3
    }
];

export const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-sm border-r">
                {/* Header */}
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-gray-900">
                        Coupon Hub
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Panel de Control
                    </p>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveRoute(item.path);
                        
                        return (
                            <Button
                                key={item.id}
                                variant={isActive ? "default" : "ghost"}
                                className={cn(
                                    "w-full justify-start text-left",
                                    isActive && "bg-primary text-primary-foreground"
                                )}
                                onClick={() => navigate(item.path)}
                            >
                                <Icon className="mr-3 h-4 w-4" />
                                {item.label}
                            </Button>
                        );
                    })}
                </nav>

                {/* Logout button at bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-3 h-4 w-4" />
                        Cerrar Sesión
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {navigationItems.find(item => isActiveRoute(item.path))?.label || 'Dashboard'}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Bienvenido de vuelta
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};