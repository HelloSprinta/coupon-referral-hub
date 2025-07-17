import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: LucideIcon;
    subtitle?: string;
}

export function MetricCard({ title, value, change, changeType, icon: Icon, subtitle }: MetricCardProps) {
    const changeColor = changeType === 'positive' ? 'text-green-500' : 'text-red-500';
    const TrendIcon = changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';

    return (
        <Card className="bg-card border-border">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <div className="flex items-center text-sm">
                    <div className={`w-3 h-3 mr-1 ${changeColor}`}>
                        {changeType === 'positive' ? '↗' : '↘'}
                    </div>
                    <span className={changeColor}>{change}</span>
                    {subtitle && <span className="text-muted-foreground ml-1">{subtitle}</span>}
                </div>
            </CardContent>
        </Card>
    );
}