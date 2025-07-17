import { DollarSign, TrendingUp, Users, Target } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { EarningsChart } from "./EarningsChart";
import { UsersChart } from "./UsersChart";
import { TopCodesTable } from "./TopCodesTable";
import { useTranslation } from "react-i18next";

interface DashboardTabProps {
    monthlyData: Array<{ month: string; earnings: number; users: number }>;
    topCodes: Array<{ code: string; users: number; earnings: number; conversion: string }>;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ monthlyData, topCodes }) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title={t("metrics_total_money")}
                    value="$12,725.50"
                    icon={DollarSign} change={""} changeType={"positive"}/>
                <MetricCard
                    title={t("metrics_money_this_month")}
                    value="$3,250.00"
                    change="+12.5%"
                    changeType="positive"
                    icon={TrendingUp}
                    subtitle={t("metrics_vs_may")}
                />
                <MetricCard
                    title={t("metrics_total_users")}
                    value="486"
                    change="+18.2%"
                    changeType="positive"
                    icon={Users}
                    subtitle={t("metrics_growth")}
                />
                <MetricCard
                    title={t("metrics_users_this_month")}
                    value="112"
                    change="+17.9%"
                    changeType="positive"
                    icon={Target}
                    subtitle={t("metrics_vs_may")}
                />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EarningsChart data={monthlyData} />
                <UsersChart data={monthlyData} />
            </div>

            {/* Tabla de códigos exitosos */}
            <TopCodesTable codes={topCodes} />
        </div>
    );
};
