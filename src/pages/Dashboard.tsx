
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, LogOut, Plus, Search, Filter, Copy, ChevronDown, ChevronUp, Settings } from "lucide-react";
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
  const [accountFilter, setAccountFilter] = useState("all");
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
      creationDate: "2025-04-21 10:41",
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "26% / 15%"
    },
    {
      code: "CREATETIME",
      description: "to test create t...",
      creationDate: "2025-04-14 05:56",
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "31% / 10%"
    },
    {
      code: "SETDEFAULT",
      description: "set default wh...",
      creationDate: "2025-04-14 05:33",
      referrals: 0,
      firstLevelValue: 0,
      totalCommission: 0,
      trackingVolume: 0,
      splitRate: "26% / 15%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">REFERIDOS</h1>
            <p className="text-sm text-muted-foreground">
              Administra quiénes están haciendo uso de tus cupones
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-border/40 hover:bg-accent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="referidos" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="referidos" className="data-[state=active]:bg-accent data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Referidos
              </TabsTrigger>
              <TabsTrigger value="cupones" className="data-[state=active]:bg-accent data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Cupones de referidos
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Button
                onClick={() => setShowCreateCoupon(true)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Referral Code
              </Button>
              
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by Code or Note"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>

              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger className="w-40 bg-muted border-border">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-muted border-border"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-muted border-border"
              />
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="referidos">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        UID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1">
                          Registration Date 
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        Referral Code
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1">
                          Verification Date 
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1">
                          First Deposit Date 
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1">
                          First Trade Date 
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1">
                          Commission (USD) 
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral, index) => (
                      <tr
                        key={referral.uid}
                        className={`border-t border-border hover:bg-muted/30 transition-colors ${
                          index % 2 === 0 ? "bg-card" : "bg-muted/10"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-foreground">
                          <div className="flex items-center gap-2">
                            {referral.uid}
                            <Copy className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Email: {referral.email}
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
                            className="h-8 w-8 p-0 hover:bg-accent"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cupones">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Referral Code</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1">
                          Creation Date 
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Referrals</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">First-level Value</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Total Commission (USD)</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1">
                          Tracking Volume (USD) 
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Split commission rate</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralCodes.map((code, index) => (
                      <tr
                        key={code.code}
                        className={`border-t border-border hover:bg-muted/30 transition-colors ${
                          index % 2 === 0 ? "bg-card" : "bg-muted/10"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-foreground">
                          <div className="font-medium">{code.code}</div>
                          <div className="text-xs text-muted-foreground">{code.description}</div>
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
                            className="h-8 w-8 p-0 hover:bg-accent"
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
