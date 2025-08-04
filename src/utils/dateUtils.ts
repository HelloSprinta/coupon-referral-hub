export const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Indefinido';

    try {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    } catch {
        return 'Fecha inválida';
    }
};

export const isExpired = (endDate?: string): boolean => {
    if (!endDate) return false;

    try {
        const now = new Date();
        const end = new Date(endDate);
        return end < now;
    } catch {
        return false;
    }
};

export const getCouponStatus = (endDate?: string): 'Activo' | 'Expirado' => {
    return isExpired(endDate) ? 'Expirado' : 'Activo';
};

export const getStatusStyles = (status: string): string => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';

    switch (status) {
        case 'Activo':
            return `${baseClasses} bg-green-100 text-green-800`;
        case 'Expirado':
            return `${baseClasses} bg-red-100 text-red-800`;
        default:
            return `${baseClasses} bg-gray-100 text-gray-800`;
    }
};