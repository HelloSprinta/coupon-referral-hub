import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useNavigate } from "react-router-dom";
import { ViewReferralModal } from "@/components/ViewReferralModal";
import { EditCouponModal } from "@/components/EditCouponModal";
import { CreateCouponModal } from "@/components/CreateCouponModal";

// Importar los nuevos componentes del dashboard
import { DashboardTab } from "@/components/dashboard/DashboardTab";
import { ReferralsTab } from "@/components/dashboard/ReferralsTab";
import { CodesTab } from "@/components/dashboard";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Estados principales
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [showCreateCoupon, setShowCreateCoupon] = useState(false);
  
  // Estados de filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [accountFilter, setAccountFilter] = useState("All Accounts");
  const [startDate, setStartDate] = useState("2019-01-01");
  const [endDate, setEndDate] = useState("2025-05-27");

  const handleLogout = () => {
    navigate("/");
  };

  // Datos para el dashboard
  const monthlyData = [
    { month: 'Ene', earnings: 1250, users: 45 },
    { month: 'Feb', earnings: 1890, users: 67 },
    { month: 'Mar', earnings: 2340, users: 89 },
    { month: 'Abr', earnings: 2100, users: 78 },
    { month: 'May', earnings: 2890, users: 95 },
    { month: 'Jun', earnings: 3250, users: 112 }
  ];

  const topCodes = [
    { code: 'YQDTSKN', users: 45, earnings: 1250.75, conversion: '12.5%' },
    { code: 'PUP4DRKK', users: 38, earnings: 980.50, conversion: '10.2%' },
    { code: 'W3GVMRI', users: 32, earnings: 875.25, conversion: '9.8%' },
    { code: 'CUSTOMCODE24', users: 28, earnings: 720.00, conversion: '8.5%' },
    { code: 'TESTDEFAULT', users: 25, earnings: 650.30, conversion: '7.9%' }
  ];

  const referrals = [
    {
      uid: "1103711477",
      email: "🏯 Futures 202604",
      registrationDate: "2025-04-21 10:41",
      referralCode: "YQDTSKN",
      verificationDate: "2025-04-22",
      firstDeposit: "-",
      firstTrade: "2025-04-22 08:15",
      commission: "1.0257"
    },
    {
      uid: "1101336368", 
      email: "🈸 海5漂徒",
      registrationDate: "2025-04-14 05:56",
      referralCode: "PUP4DRKK",
      verificationDate: "-",
      firstDeposit: "-",
      firstTrade: "-",
      commission: "-"
    },
    {
      uid: "1101334581",
      email: "🈸 海6大咕禮", 
      registrationDate: "2025-04-14 05:33",
      referralCode: "PUP4DRKK",
      verificationDate: "-",
      firstDeposit: "-",
      firstTrade: "-",
      commission: "-"
    },
    {
      uid: "1101333998",
      email: "⚡ JiLi",
      registrationDate: "2025-04-14 05:26", 
      referralCode: "W3GVMRI",
      verificationDate: "-",
      firstDeposit: "-",
      firstTrade: "-",
      commission: "-"
    },
    {
      uid: "1101306946",
      email: "Add Note",
      registrationDate: "2025-04-14 03:46",
      referralCode: "YQDTSKN", 
      verificationDate: "-",
      firstDeposit: "-",
      firstTrade: "-",
      commission: "-"
    }
  ];

  const referralCodes = [
    {
      code: "CUSTOMCODE24",
      description: "customize code",
      creationDate: "2025-05-27 00:00",
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "26% / 15%",
      status: "Default"
    },
    {
      code: "CREATETIME",
      description: "to test create t...",
      creationDate: "2025-05-27 00:00", 
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "26% / 15%",
      status: ""
    },
    {
      code: "SETDEFAULT", 
      description: "set default wh...",
      creationDate: "2025-05-26 00:00",
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "31% / 10%",
      status: ""
    },
    {
      code: "TESTDEFAULT",
      description: "",
      creationDate: "2025-05-26 00:00",
      referrals: 0,
      firstLevelValue: 0, 
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "31% / 10%",
      status: "Default"
    },
    {
      code: "FORTEST",
      description: "new entrance ...",
      creationDate: "2025-05-26 00:00",
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "26% / 15%",
      status: ""
    },
    {
      code: "ETT0525",
      description: "enhancelistD...",
      creationDate: "2025-05-26 00:00", 
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "31% / 10%",
      status: ""
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://agents.sprinta.ai/sprinta-logo.svg" alt="Sprinta Logo" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-semibold text-foreground">{t("dashboard")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-border text-foreground hover:bg-accent"
            >
              <LogOut className="w-4 h-4 mr-2" /> {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          {/* Tab Navigation */}
          <div className="mb-6">
            <TabsList className="bg-transparent border-b border-border rounded-none p-0 h-auto">
              <TabsTrigger 
                value="dashboard" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="referidos" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                {t("tab_referrals")}
              </TabsTrigger>
              <TabsTrigger 
                value="cupones" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                {t("tab_referral_codes")}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
          <TabsContent value="dashboard">
            <DashboardTab 
              monthlyData={monthlyData}
              topCodes={topCodes}
            />
          </TabsContent>

          <TabsContent value="referidos">
            <ReferralsTab
              referrals={referrals}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              accountFilter={accountFilter}
              setAccountFilter={setAccountFilter}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              onCreateCoupon={() => setShowCreateCoupon(true)}
              onSelectReferral={setSelectedReferral}
            />
          </TabsContent>

          <TabsContent value="cupones">
            <CodesTab
              referralCodes={referralCodes}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              accountFilter={accountFilter}
              setAccountFilter={setAccountFilter}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              onCreateCoupon={() => setShowCreateCoupon(true)}
              onSelectCoupon={setSelectedCoupon}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <ViewReferralModal
        referral={selectedReferral}
        onClose={() => setSelectedReferral(null)}
      />
      <EditCouponModal
        coupon={selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
      />
      <CreateCouponModal
        open={showCreateCoupon}
        onClose={() => setShowCreateCoupon(false)}
      />
    </div>
  );
};

export default Dashboard;