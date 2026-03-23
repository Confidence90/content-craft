import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (fr: string | null | undefined, en: string | null | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("site_lang");
    return (saved === "en" ? "en" : "fr") as Language;
  });

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("site_lang", newLang);
  };

  const t = (fr: string | null | undefined, en: string | null | undefined): string => {
    if (lang === "en") return en || fr || "";
    return fr || en || "";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
