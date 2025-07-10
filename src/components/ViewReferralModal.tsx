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
      <DialogContent className="sm:max-w-md bg-card border-border p-0 gap-0">
        {/* Header con estilo personalizado */}
        <div className="bg-primary text-primary-foreground px-6 py-4 rounded-t-lg">
          <DialogTitle className="text-lg font-bold tracking-wide">
            VER REFERIDO
          </DialogTitle>
        </div>
        
        {/* Body del modal */}
        <div className="px-6 py-6 space-y-5">
          {/* Nombre */}
          <div className="space-y-3">
            <Label htmlFor="nombre" className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Nombre
            </Label>
            <Input
              id="nombre"
              value={referral.email}
              readOnly
              className="bg-input text-foreground border-border h-11 rounded-lg"
            />
          </div>
          
          {/* Gmail */}
          <div className="space-y-3">
            <Label htmlFor="gmail" className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Gmail
            </Label>
            <Input
              id="gmail"
              value={referral.email}
              readOnly
              className="bg-input text-foreground border-border h-11 rounded-lg"
            />
          </div>
          
          {/* Cupón */}
          <div className="space-y-3">
            <Label htmlFor="cupon" className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Cupón
            </Label>
            <Input
              id="cupon"
              value={referral.referralCode}
              readOnly
              className="bg-input text-foreground border-border h-11 rounded-lg font-mono"
            />
          </div>
          
          {/* Plan actual */}
          <div className="space-y-3">
            <Label htmlFor="plan" className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Plan actual
            </Label>
            <Input
              id="plan"
              value={referral.commission !== "-" ? "Premium" : "Basic"}
              readOnly
              className="bg-input text-foreground border-border h-11 rounded-lg"
            />
          </div>
        </div>
        
        {/* Footer con botón */}
        <div className="px-6 pb-6">
          <Button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}