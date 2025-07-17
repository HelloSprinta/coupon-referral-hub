import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, Copy, Edit, Calendar, Plus } from "lucide-react";

interface ReferralCode {
    code: string;
    description: string;
    creationDate: string;
    referrals: number;
    firstLevelValue: number;
    totalCommission: number;
    trackingVolume: number;
    splitRate: string;
    status: string;
}

interface CodesTabProps {
    referralCodes: ReferralCode[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    accountFilter: string;
    setAccountFilter: (filter: string) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    onCreateCoupon: () => void;
    onSelectCoupon: (coupon: ReferralCode) => void;
}

export function CodesTab({
    referralCodes,
    searchTerm,
    setSearchTerm,
    accountFilter,
    setAccountFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onCreateCoupon,
    onSelectCoupon
}: CodesTabProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        onClick={onCreateCoupon}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {t("create_referral_code")}
                    </Button>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder={t("search_placeholder")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-input border-border text-foreground placeholder-muted-foreground w-64"
                        />
                    </div>

                    <Select value={accountFilter} onValueChange={setAccountFilter}>
                        <SelectTrigger className="w-40 bg-input border-border text-foreground">
                            <SelectValue placeholder={t("all_accounts")} />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                            <SelectItem value="All Accounts">{t("all_accounts")}</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-input border-border text-foreground"
                    />
                    <span className="text-muted-foreground">→</span>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-input border-border text-foreground"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-border text-foreground hover:bg-accent"
                    >
                        <Calendar className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr className="border-b border-border">
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                {t("referral_code")}
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    {t("registration_date")}
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    {t("referrals")}
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    First-time earnings (USD)
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    {t("commission")} (USD)
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    Tracking Volume (USD)
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                Split commission rate (spot/futures)
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {referralCodes.map((code) => (
                            <tr
                                key={code.code}
                                className="border-b border-border hover:bg-muted/30 transition-colors"
                            >
                                <td className="px-4 py-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-foreground font-medium">{code.code}</span>
                                        {code.status === "Default" && (
                                            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded font-medium">
                                                {t("default")}
                                            </span>
                                        )}
                                        <Copy className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
                                    </div>
                                    {code.description && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                            🔗 {code.description}
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-foreground">{code.creationDate}</td>
                                <td className="px-4 py-3 text-sm text-foreground">{code.referrals}</td>
                                <td className="px-4 py-3 text-sm text-foreground">{code.firstLevelValue}</td>
                                <td className="px-4 py-3 text-sm text-foreground">{code.totalCommission}</td>
                                <td className="px-4 py-3 text-sm text-foreground">{code.trackingVolume}</td>
                                <td className="px-4 py-3 text-sm text-foreground">{code.splitRate}</td>
                                <td className="px-4 py-3">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onSelectCoupon(code)}
                                        className="h-8 w-8 p-0 hover:bg-accent text-muted-foreground hover:text-foreground"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}