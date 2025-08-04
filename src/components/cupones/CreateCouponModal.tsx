import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CHANNELS } from '@/config/channels';

interface CreateCouponModalProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export const CreateCouponModal: React.FC<CreateCouponModalProps> = ({
    onClose,
    onSubmit
}) => {
    const [formData, setFormData] = useState({
        code: '',
        start_date: '',
        end_date: '',
        discount_percentage: '',
        description: '',
        days_validity_free: '',
        channel: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            discount_percentage: formData.discount_percentage ? Number(formData.discount_percentage) : undefined,
            days_validity_free: formData.days_validity_free ? Number(formData.days_validity_free) : undefined
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">Crear Nuevo Cupón</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del Cupón *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="EJ. NOMBRE DE CUPÓN"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha Inicio *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha Expiración
                            </label>
                            <input
                                type="date"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Canal de Difusión *
                        </label>
                        <select 
                            required
                            value={formData.channel}
                            onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Seleccionar canal</option>
                            {CHANNELS.map((channel) => (
                                <option key={channel.id} value={channel.id}>
                                    {channel.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Límite de Uso
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                placeholder="Ej. 100"
                                value={formData.days_validity_free}
                                onChange={(e) => setFormData({ ...formData, days_validity_free: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm">Uso ilimitado</span>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Número máximo de usuarios que pueden usar este cupón
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción (Opcional)
                        </label>
                        <textarea
                            placeholder="Describe el propósito de este cupón..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        >
                            Crear Cupón
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
