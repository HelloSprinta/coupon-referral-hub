import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "es");

  const toggleLanguage = () => {
    const newLang = lang === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="border-border/40 hover:bg-accent transition-colors"
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">{lang === "es" ? "Switch to English" : "Cambiar a Español"}</span>
    </Button>
  );
}
