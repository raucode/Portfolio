import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../locales/translations";

const LanguageContext = createContext();

function detectBrowserLanguage() {
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || "en"];

  const normalized = browserLanguages.map((lang) => lang.toLowerCase());

  for (const lang of normalized) {
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("pt")) return "pt";
    if (lang.startsWith("en")) return "en";
  }

  return "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage && ["en", "es", "pt"].includes(savedLanguage)) {
      return savedLanguage;
    }

    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    return {
      language,
      setLanguage,
      t: translations[language],
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}