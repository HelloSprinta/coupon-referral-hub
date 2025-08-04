import React from 'react';

interface CouponsTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const CouponsTabs: React.FC<CouponsTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'sprinter', label: 'Sprinter' },
        { id: 'cupones', label: 'Cupones' },
        { id: 'referidos', label: 'Referidos' },
        { id: 'retiros', label: 'Retiros y Pagos' },
        { id: 'analisis', label: 'Análisis y Seguimiento' }
    ];

    return (
        <div className="mb-8">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-emerald-500 text-emerald-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};