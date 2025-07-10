
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ViewReferralModalProps {
  referral: any;
  onClose: () => void;
}

export function ViewReferralModal({ referral, onClose }: ViewReferralModalProps) {
  if (!referral) return null;

  return (
    <Dialog open={!!referral} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-bold">VER REFERIDO</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm font-medium text-foreground">
              Nombre
            </Label>
            <Input
              id="nombre"
              value={referral.name}
              readOnly
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gmail" className="text-sm font-medium text-foreground">
              Gmail
            </Label>
            <Input
              id="gmail"
              value={referral.email}
              readOnly
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cupon" className="text-sm font-medium text-foreground">
              Cupón
            </Label>
            <Input
              id="cupon"
              value={referral.coupon}
              readOnly
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="plan" className="text-sm font-medium text-foreground">
              Plan actual
            </Label>
            <Input
              id="plan"
              value={referral.plan}
              readOnly
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="pt-4">
            <Button
              onClick={onClose}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
