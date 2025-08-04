import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Moon, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const handleDarkModeToggle = () => {
        // Placeholder for dark mode functionality
        console.log('Dark mode toggle clicked');
    };

    const handleLanguageToggle = () => {
        // Placeholder for language toggle functionality
        console.log('Language toggle clicked');
    };

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Left side - Logo and title */}
                    <div className="flex items-center gap-3">
                        <img
                            src="https://agents.sprinta.ai/sprinta-logo.svg"
                            alt="Sprinta"
                            className="w-8 h-8"
                        />
                        <h1 className="text-xl font-bold text-gray-900">Panel de control</h1>
                    </div>

                    {/* Right side - Controls */}
                    <div className="flex items-center gap-4">
                        {/* Dark mode toggle button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDarkModeToggle}
                            className="h-9 w-9 hover:bg-gray-100"
                        >
                            <Moon className="h-4 w-4 text-gray-600" />
                        </Button>

                        {/* Language toggle button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLanguageToggle}
                            className="h-9 w-9 hover:bg-gray-100"
                        >
                            <Languages className="h-4 w-4 text-gray-600" />
                        </Button>

                        {/* Logout button */}
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Cerrar sesión</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};