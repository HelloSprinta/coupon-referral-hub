
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateCouponModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCouponModal({ open, onClose }: CreateCouponModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    beneficioReferidor: "",
    beneficioReferido: "",
    planSuscripcion: ""
  });

  const handleCreate = () => {
    console.log("Creating coupon:", formData);
    // Reset form
    setFormData({
      nombre: "",
      fechaInicio: "",
      fechaFin: "",
      beneficioReferidor: "",
      beneficioReferido: "",
      planSuscripcion: ""
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-bold">CREAR CUPON</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm font-medium text-foreground">
              Nombre
            </Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="bg-muted text-foreground border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fechaInicio" className="text-sm font-medium text-foreground">
              Fecha de inicio
            </Label>
            <Input
              id="fechaInicio"
              type="date"
              value={formData.fechaInicio}
              onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
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
              value={formData.fechaFin}
              onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
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
          
          <div className="space-y-2">
            <Label htmlFor="planSuscripcion" className="text-sm font-medium text-foreground">
              Plan de suscripción
            </Label>
            <Select
              value={formData.planSuscripcion}
              onValueChange={(value) => setFormData({ ...formData, planSuscripcion: value })}
            >
              <SelectTrigger className="bg-muted text-foreground border-border">
                <SelectValue placeholder="Seleccionar plan" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4">
            <Button
              onClick={handleCreate}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Crear
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
