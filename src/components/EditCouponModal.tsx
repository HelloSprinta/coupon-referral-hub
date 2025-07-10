import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

interface EditCouponModalProps {
  coupon: any;
  onClose: () => void;
  onUpdateSuccess?: (updatedCoupon: any) => void;
  onDeleteSuccess?: (deletedCode: string) => void;
}

export function EditCouponModal({ coupon, onClose, onUpdateSuccess, onDeleteSuccess }: EditCouponModalProps) {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    beneficioReferidor: "",
    beneficioReferido: "",
    planSuscripcion: "",
    isActive: true,
    splitRate: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || "",
        description: coupon.description || "",
        startDate: coupon.startDate || "",
        endDate: coupon.endDate || "",
        beneficioReferidor: coupon.referrerBenefit || "TOKENS + COMISIÓN DEL 20%",
        beneficioReferido: coupon.referredBenefit || "1ER MES GRATIS",
        planSuscripcion: coupon.subscriptionPlan || "Basic",
        isActive: coupon.status !== "Inactive",
        splitRate: coupon.splitRate || "26% / 15%"
      });
    }
  }, [coupon]);

  if (!coupon) return null;

  const handleSave = async () => {
    // Validaciones
    if (!formData.code.trim()) {
      toast({
        title: "Error",
        description: "El código del cupón es requerido",
        variant: "destructive",
      });
      return;
    }

    if (formData.startDate && formData.endDate && 
        new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast({
        title: "Error",
        description: "La fecha de fin debe ser posterior a la fecha de inicio",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedCoupon = {
        ...coupon,
        code: formData.code,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        referrerBenefit: formData.beneficioReferidor,
        referredBenefit: formData.beneficioReferido,
        subscriptionPlan: formData.planSuscripcion,
        status: formData.isActive ? (coupon.status === "Default" ? "Default" : "") : "Inactive",
        splitRate: formData.splitRate
      };

      if (onUpdateSuccess) {
        onUpdateSuccess(updatedCoupon);
      }

      toast({
        title: "¡Cupón actualizado exitosamente!",
        description: `El cupón ${formData.code} ha sido actualizado`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el cupón. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));

      if (onDeleteSuccess) {
        onDeleteSuccess(coupon.code);
      }

      toast({
        title: "Cupón eliminado",
        description: `El cupón ${coupon.code} ha sido eliminado`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el cupón. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  return (
    <Dialog open={!!coupon} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border p-0 gap-0">
        {/* Header con estilo personalizado */}
        <div className="bg-primary text-primary-foreground px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold tracking-wide">
              EDITAR CUPÓN
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="h-6 w-6 text-primary-foreground hover:bg-destructive/20"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Confirmación de eliminación */}
        {showDeleteConfirm && (
          <div className="bg-destructive/10 border-b border-destructive/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-destructive">
                  ¿Estás seguro de eliminar este cupón?
                </p>
                <p className="text-xs text-muted-foreground">
                  Esta acción no se puede deshacer
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Eliminando..." : "Eliminar"}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Body del modal */}
        <div className="px-6 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Código del cupón */}
          <div className="space-y-3">
            <Label htmlFor="code" className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Código del cupón
            </Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all"
              placeholder="Código del cupón"
              disabled={isLoading}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Descripción
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all"
              placeholder="Descripción del cupón"
              disabled={isLoading}
            />
          </div>
          
          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="startDate" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Fecha de inicio
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="endDate" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Fecha de fin
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all"
                disabled={isLoading}
              />
            </div>
          </div>
          
          {/* Beneficio referidor */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Beneficio referidor
            </Label>
            <Select
              value={formData.beneficioReferidor}
              onValueChange={(value) => setFormData({ ...formData, beneficioReferidor: value })}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border rounded-lg">
                <SelectItem value="TOKENS + COMISIÓN DEL 20%">TOKENS + COMISIÓN DEL 20%</SelectItem>
                <SelectItem value="TOKENS + COMISIÓN DEL 15%">TOKENS + COMISIÓN DEL 15%</SelectItem>
                <SelectItem value="TOKENS + COMISIÓN DEL 25%">TOKENS + COMISIÓN DEL 25%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Beneficio referido */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Beneficio referido
            </Label>
            <Select
              value={formData.beneficioReferido}
              onValueChange={(value) => setFormData({ ...formData, beneficioReferido: value })}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border rounded-lg">
                <SelectItem value="1ER MES GRATIS">1ER MES GRATIS</SelectItem>
                <SelectItem value="2 MESES GRATIS">2 MESES GRATIS</SelectItem>
                <SelectItem value="50% DESCUENTO">50% DESCUENTO</SelectItem>
                <SelectItem value="3 MESES GRATIS">3 MESES GRATIS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Plan de suscripción */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Plan de suscripción
            </Label>
            <Select
              value={formData.planSuscripcion}
              onValueChange={(value) => setFormData({ ...formData, planSuscripcion: value })}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border rounded-lg">
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estado activo */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold text-foreground">
                Cupón activo
              </Label>
              <p className="text-xs text-muted-foreground">
                Desactiva el cupón para que no pueda ser utilizado
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              disabled={isLoading}
            />
          </div>
        </div>
        
        {/* Footer con botón */}
        <div className="px-6 pb-6">
          <Button
            onClick={handleSave}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}