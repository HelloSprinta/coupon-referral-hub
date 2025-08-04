import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import {
    Ticket,
    TrendingUp,
    Users,
    DollarSign,
    Eye,
    ArrowRight
} from 'lucide-react';

const ControlPanel = () => {

    const stats = [
        {
            title: 'Ventas actuales',
            value: '$52.00',
            change: '+12%',
            icon: DollarSign,
            color: 'text-green-600'
        },
        {
            title: 'Usuarios',
            value: '1,234',
            change: '+5%',
            icon: Users,
            color: 'text-blue-600'
        },
        {
            title: 'Conversión',
            value: '12%',
            change: '+2%',
            icon: TrendingUp,
            color: 'text-purple-600'
        },
        {
            title: 'Vistas',
            value: '5,678',
            change: '+8%',
            icon: Eye,
            color: 'text-orange-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Title Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Programa Sprinters</h2>
                    <p className="text-gray-600">Último mes</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                    <p className={`text-sm ${stat.color} font-medium`}>
                                        {stat.change} vs mes pasado
                                    </p>
                                </div>
                                <div className={`p-3 rounded-lg bg-gray-50`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                    {/* Cupones Card */}
                    <Link
                        to="/cupones"
                        className="group bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-200 hover:border-emerald-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-100 rounded-lg">
                                <Ticket className="w-6 h-6 text-emerald-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Gestión de Cupones
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Crea, gestiona y analiza tus cupones de descuento y referidos
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">
                            <span>Ver cupones</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>

                    {/* Otros módulos (placeholders) */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border opacity-60">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Usuarios
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Gestiona usuarios y permisos del sistema
                        </p>
                        <p className="mt-4 text-gray-400 text-sm">Próximamente</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border opacity-60">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Analíticas
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Reportes y métricas detalladas de rendimiento
                        </p>
                        <p className="mt-4 text-gray-400 text-sm">Próximamente</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Actividad Reciente
                    </h3>
                    <div className="space-y-3">
                        {[
                            { action: 'Cupón creado', item: 'DESCUENTO2024', time: 'Hace 2 horas' },
                            { action: 'Usuario registrado', item: 'nuevo@email.com', time: 'Hace 4 horas' },
                            { action: 'Cupón utilizado', item: 'SPRINTA50', time: 'Hace 6 horas' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-gray-600">{activity.item}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ControlPanel;