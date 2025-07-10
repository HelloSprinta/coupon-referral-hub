import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, LogOut, Plus, Search, ChevronDown, Copy, Settings, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { ViewReferralModal } from "@/components/ViewReferralModal";
import { EditCouponModal } from "@/components/EditCouponModal";
import { CreateCouponModal } from "@/components/CreateCouponModal";

const Dashboard = () => {
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [showCreateCoupon, setShowCreateCoupon] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountFilter, setAccountFilter] = useState("All Accounts");
  const [startDate, setStartDate] = useState("2019-01-01");
  const [endDate, setEndDate] = useState("2025-05-27");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

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
      {/* Header con colores Sprinta */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-border text-foreground hover:bg-accent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="referidos" className="w-full">
          {/* Tab Navigation con colores Sprinta */}
          <div className="mb-6">
            <TabsList className="bg-transparent border-b border-border rounded-none p-0 h-auto">
              <TabsTrigger 
                value="referidos" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Referidos
              </TabsTrigger>
              <TabsTrigger 
                value="cupones" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Código de referidos
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Controls Bar con colores Sprinta */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setShowCreateCoupon(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Referral Code
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by Code or Note"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder-muted-foreground w-64"
                />
              </div>

              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger className="w-40 bg-input border-border text-foreground">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All Accounts">All Accounts</SelectItem>
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

          <TabsContent value="referidos">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      UID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Registration Date 
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Referral Code
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Verification Date 
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        First Deposit Date 
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        First Trade Date 
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Commission (USD) 
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral, index) => (
                    <tr
                      key={referral.uid}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{referral.uid}</span>
                          <Copy className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Email {referral.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{referral.registrationDate}</td>
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{referral.referralCode}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{referral.verificationDate}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{referral.firstDeposit}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{referral.firstTrade}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{referral.commission}</td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedReferral(referral)}
                          className="h-8 w-8 p-0 hover:bg-accent text-muted-foreground hover:text-foreground"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="cupones">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Referral Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Creation Date 
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Referrals 
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      First-time earnings (USD) 
                      <ChevronDown className="w-3 h-3" />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Total Commission (USD) 
                      <ChevronDown className="w-3 h-3" />
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
                  {referralCodes.map((code, index) => (
                    <tr
                      key={code.code}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-medium">{code.code}</span>
                          {code.status === "Default" && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded font-medium">
                              Default
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
                          onClick={() => setSelectedCoupon(code)}
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
          </TabsContent>
        </Tabs>
      </div>

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