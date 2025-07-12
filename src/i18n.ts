
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esTranslation from "../public/locales/es/translation.json";
import enTranslation from "../public/locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "es", // Idioma por defecto: español
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: esTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
  });

export default i18n;
