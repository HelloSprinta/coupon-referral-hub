
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { ViewReferralModal } from "@/components/ViewReferralModal";
import { EditCouponModal } from "@/components/EditCouponModal";
import { CreateCouponModal } from "@/components/CreateCouponModal";

const Dashboard = () => {
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [showCreateCoupon, setShowCreateCoupon] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const referrals = [
    {
      id: "119011497",
      registrationDate: "2025-04-21 19:41",
      status: "VERIFIED",
      verificationDate: "2025-04-22",
      firstDeposit: "-",
      profitPoints: "-",
      commissionPoints: "1.0357",
      name: "John Doe",
      email: "john@example.com",
      coupon: "SUMMER2025",
      plan: "Premium"
    },
    {
      id: "119019481",
      registrationDate: "2025-04-16 09:33",
      status: "PURCHASE",
      verificationDate: "-",
      firstDeposit: "-",
      profitPoints: "-",
      commissionPoints: "-",
      name: "Jane Smith",
      email: "jane@example.com",
      coupon: "WINTER2025",
      plan: "Basic"
    }
  ];

  const coupons = [
    {
      code: "CUSTOMER2025",
      creationDate: "2025-05-27 08:00",
      status: "Active",
      totalReferrals: 0,
      totalCommission: 0,
      trackingApplications: 0,
      totalCommissionEarned: "25% / 15%",
      startDate: "2025-05-27",
      endDate: "2025-12-31",
      beneficioReferidor: "TOKENS + COMISIÓN DEL 20%",
      beneficioReferido: "1ER MES GRATIS"
    },
    {
      code: "FORESTT",
      creationDate: "2025-05-26 00:00",
      status: "Active",
      totalReferrals: 0,
      totalCommission: 0,
      trackingApplications: 0,
      totalCommissionEarned: "25% / 15%",
      startDate: "2025-05-26",
      endDate: "2025-12-31",
      beneficioReferidor: "TOKENS + COMISIÓN DEL 20%",
      beneficioReferido: "1ER MES GRATIS"
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
              <TabsTrigger value="referidos" className="data-[state=active]:bg-accent">
                Referidos
              </TabsTrigger>
              <TabsTrigger value="cupones" className="data-[state=active]:bg-accent">
                Cupones de referidos
              </TabsTrigger>
            </TabsList>
            
            <Button
              onClick={() => setShowCreateCoupon(true)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Crear Referral Code
            </Button>
          </div>

          <TabsContent value="referidos">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Registration Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Verification Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">First Deposit</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Profit Points</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Commission Points</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral, index) => (
                      <tr
                        key={referral.id}
                        className={`border-t border-border hover:bg-muted/30 transition-colors ${
                          index % 2 === 0 ? "bg-card" : "bg-muted/10"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-foreground">{referral.id}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{referral.registrationDate}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{referral.status}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{referral.verificationDate}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{referral.firstDeposit}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{referral.profitPoints}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{referral.commissionPoints}</td>
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedReferral(referral)}
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

          <TabsContent value="cupones">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Referral Code</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Creation Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Total Referrals</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Total Commission</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Tracking Applications</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Total Commission Earned</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon, index) => (
                      <tr
                        key={coupon.code}
                        className={`border-t border-border hover:bg-muted/30 transition-colors ${
                          index % 2 === 0 ? "bg-card" : "bg-muted/10"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-foreground font-medium">{coupon.code}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{coupon.creationDate}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{coupon.status}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{coupon.totalReferrals}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{coupon.totalCommission}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{coupon.trackingApplications}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{coupon.totalCommissionEarned}</td>
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedCoupon(coupon)}
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
