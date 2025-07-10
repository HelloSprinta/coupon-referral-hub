
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditCouponModalProps {
  coupon: any;
  onClose: () => void;
}

export function EditCouponModal({ coupon, onClose }: EditCouponModalProps) {
  const [formData, setFormData] = useState({
    code: "",
    startDate: "",
    endDate: "",
    beneficioReferidor: "",
    beneficioReferido: ""
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || "",
        startDate: coupon.startDate || "",
        endDate: coupon.endDate || "",
        beneficioReferidor: coupon.beneficioReferidor || "",
        beneficioReferido: coupon.beneficioReferido || ""
      });
    }
  }, [coupon]);

  if (!coupon) return null;

  const handleSave = () => {
    console.log("Saving coupon:", formData);
    onClose();
  };

  return (
    <Dialog open={!!coupon} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-bold">EDITAR CUPON</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cupon" className="text-sm font-medium text-foreground">
              Cupón
            </Label>
            <Input
              id="cupon"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fechaInicio" className="text-sm font-medium text-foreground">
              Fecha de Inicio
            </Label>
            <Input
              id="fechaInicio"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fechaFin" className="text-sm font-medium text-foreground">
              Fecha de fin
            </Label>
            <Input
              id="fechaFin"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="beneficioReferidor" className="text-sm font-medium text-foreground">
              Beneficio referidor
            </Label>
            <Select
              value={formData.beneficioReferidor}
              onValueChange={(value) => setFormData({ ...formData, beneficioReferidor: value })}
            >
              <SelectTrigger className="bg-muted text-foreground border-border">
                <SelectValue placeholder="Seleccionar beneficio" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="TOKENS + COMISIÓN DEL 20%">TOKENS + COMISIÓN DEL 20%</SelectItem>
                <SelectItem value="TOKENS + COMISIÓN DEL 15%">TOKENS + COMISIÓN DEL 15%</SelectItem>
                <SelectItem value="TOKENS + COMISIÓN DEL 25%">TOKENS + COMISIÓN DEL 25%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="beneficioReferido" className="text-sm font-medium text-foreground">
              Beneficio referido
            </Label>
            <Select
              value={formData.beneficioReferido}
              onValueChange={(value) => setFormData({ ...formData, beneficioReferido: value })}
            >
              <SelectTrigger className="bg-muted text-foreground border-border">
                <SelectValue placeholder="Seleccionar beneficio" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="1ER MES GRATIS">1ER MES GRATIS</SelectItem>
                <SelectItem value="2 MESES GRATIS">2 MESES GRATIS</SelectItem>
                <SelectItem value="50% DESCUENTO">50% DESCUENTO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4">
            <Button
              onClick={handleSave}
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
