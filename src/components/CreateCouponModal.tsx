import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface CreateCouponModalProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess?: (newCode: any) => void;
}

export function CreateCouponModal({ open, onClose, onCreateSuccess }: CreateCouponModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    beneficioReferidor: "",
    beneficioReferido: "",
    planSuscripcion: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    // Validaciones
    if (!formData.nombre.trim()) {
      toast({
        title: t("error"),
        description: t("coupon_name_required"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.fechaInicio || !formData.fechaFin) {
      toast({
        title: t("error"),
        description: t("dates_required"),
        variant: "destructive",
      });
      return;
    }

    if (new Date(formData.fechaInicio) >= new Date(formData.fechaFin)) {
      toast({
        title: t("error"),
        description: t("end_date_after_start"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.beneficioReferidor || !formData.beneficioReferido || !formData.planSuscripcion) {
      toast({
        title: t("error"),
        description: t("all_fields_required"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generar código automáticamente basado en el nombre
      const generatedCode = formData.nombre.replace(/\s+/g, '').toUpperCase().substring(0, 10) + 
                           Math.random().toString(36).substring(2, 5).toUpperCase();

      const newReferralCode = {
        code: generatedCode,
        description: formData.nombre,
        creationDate: new Date().toISOString().split('T')[0] + " 00:00",
        referrals: 0,
        firstLevelValue: 0,
        totalCommission: 0,
        trackingVolume: 0,
        splitRate: formData.beneficioReferidor.includes("20%") ? "20% / 15%" : 
                   formData.beneficioReferidor.includes("25%") ? "25% / 20%" : "26% / 15%",
        status: "",
        startDate: formData.fechaInicio,
        endDate: formData.fechaFin,
        referrerBenefit: formData.beneficioReferidor,
        referredBenefit: formData.beneficioReferido,
        subscriptionPlan: formData.planSuscripcion
      };

      // Callback para actualizar la lista en el Dashboard
      if (onCreateSuccess) {
        onCreateSuccess(newReferralCode);
      }

      toast({
        title: t("coupon_created_success"),
        description: t("coupon_created", { code: generatedCode }),
      });

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
    } catch (error) {
      toast({
        title: t("error"),
        description: t("coupon_create_failed"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
        beneficioReferidor: "",
        beneficioReferido: "",
        planSuscripcion: ""
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border p-0 gap-0">
        {/* Header con estilo personalizado */}
        <div className="bg-primary text-primary-foreground px-6 py-4 rounded-t-lg">
          <DialogTitle className="text-lg font-bold tracking-wide">
            {t("create_coupon_modal_title")}
          </DialogTitle>
        </div>
        {/* Body del modal */}
        <div className="px-6 py-6 space-y-6">
          {/* Nombre */}
          <div className="space-y-3">
            <Label htmlFor="nombre" className="text-sm font-semibold text-foreground uppercase tracking-wide">
              {t("coupon_name")}
            </Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all"
              placeholder={t("coupon_name_placeholder")}
              disabled={isLoading}
            />
          </div>
          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="fechaInicio" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                {t("start_date_label")}
              </Label>
              <Input
                id="fechaInicio"
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="fechaFin" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                {t("end_date_label")}
              </Label>
              <Input
                id="fechaFin"
                type="date"
                value={formData.fechaFin}
                onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all"
                disabled={isLoading}
              />
            </div>
          </div>
          {/* Beneficio referidor */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">
              {t("referrer_benefit")}
            </Label>
            <Select
              value={formData.beneficioReferidor}
              onValueChange={(value) => setFormData({ ...formData, beneficioReferidor: value })}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all">
                <SelectValue placeholder={t("select_benefit")}/>
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
              {t("referred_benefit")}
            </Label>
            <Select
              value={formData.beneficioReferido}
              onValueChange={(value) => setFormData({ ...formData, beneficioReferido: value })}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all">
                <SelectValue placeholder={t("select_benefit")}/>
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
              {t("subscription_plan")}
            </Label>
            <Select
              value={formData.planSuscripcion}
              onValueChange={(value) => setFormData({ ...formData, planSuscripcion: value })}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-input text-foreground border-border h-11 rounded-lg focus:ring-primary focus:border-primary transition-all">
                <SelectValue placeholder={t("select_plan")}/>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border rounded-lg">
                <SelectItem value="Basic">{t("basic")}</SelectItem>
                <SelectItem value="Premium">{t("premium")}</SelectItem>
                <SelectItem value="Professional">{t("professional")}</SelectItem>
                <SelectItem value="Enterprise">{t("enterprise")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Footer con botón */}
        <div className="px-6 pb-6">
          <Button
            onClick={handleCreate}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? t("creating") : t("create")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}