import { 
    Instagram, 
    Youtube, 
    Linkedin, 
    Facebook,
    Calendar,
    Video,
    Music
} from 'lucide-react';

export interface Channel {
    id: string;
    name: string;
    icon: any;
    color: string;
    bgColor: string;
    gradient: string;
}

export const CHANNELS: Channel[] = [
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: Music,
        color: 'text-gray-800',
        bgColor: 'bg-gray-800',
        gradient: 'from-gray-800 to-gray-900'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: Instagram,
        color: 'text-pink-600',
        bgColor: 'bg-pink-600',
        gradient: 'from-pink-500 to-purple-600'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: Youtube,
        color: 'text-red-600',
        bgColor: 'bg-red-600',
        gradient: 'from-red-500 to-red-600'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: Linkedin,
        color: 'text-blue-600',
        bgColor: 'bg-blue-600',
        gradient: 'from-blue-500 to-blue-700'
    },
    {
        id: 'evento-especial',
        name: 'Evento Especial',
        icon: Calendar,
        color: 'text-purple-600',
        bgColor: 'bg-purple-600',
        gradient: 'from-purple-500 to-purple-700'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: Facebook,
        color: 'text-blue-700',
        bgColor: 'bg-blue-700',
        gradient: 'from-blue-600 to-blue-800'
    },
    {
        id: 'evento-virtual',
        name: 'Evento Virtual',
        icon: Video,
        color: 'text-green-600',
        bgColor: 'bg-green-600',
        gradient: 'from-green-500 to-green-700'
    }
];

export const getChannelById = (id: string): Channel | undefined => {
    return CHANNELS.find(channel => channel.id === id);
};

export const getChannelIcon = (channelId: string) => {
    const channel = getChannelById(channelId);
    return channel?.icon;
};

export const getChannelColor = (channelId: string) => {
    const channel = getChannelById(channelId);
    return channel?.color || 'text-gray-600';
};

export const getChannelGradient = (channelId: string) => {
    const channel = getChannelById(channelId);
    return channel?.gradient || 'from-gray-500 to-gray-600';
};

// Top 3 channels for popular coupons display
export const TOP_CHANNELS = [
    CHANNELS.find(c => c.id === 'instagram')!,
    CHANNELS.find(c => c.id === 'tiktok')!,
    CHANNELS.find(c => c.id === 'youtube')!
];