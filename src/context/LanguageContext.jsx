import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../locales/translations";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  detectBrowserLanguage,
  normalizeLanguage,
} from "../lib/i18n/language";

const STORAGE_KEY = "site-language";

const LanguageContext = createContext(null);

function getInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) return normalizeLanguage(saved);

  return detectBrowserLanguage();
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(nextLanguage) {
    setLanguageState(normalizeLanguage(nextLanguage));
  }

  const value = useMemo(() => {
    return {
      language,
      setLanguage,
      supportedLanguages: SUPPORTED_LANGUAGES,
      t: translations[language] || translations[DEFAULT_LANGUAGE],
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
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}