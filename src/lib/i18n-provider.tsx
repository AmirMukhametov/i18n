// src/lib/i18n-provider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import translations from "../../translations.json";
import { useLocation } from "react-router-dom";

const supportedLocales = ["en", "ru", "ar"] as const;
type Locale = (typeof supportedLocales)[number];

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({
  locale: "en",
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

function getMessagesForLocale(locale: Locale) {
  const messages: Record<string, string> = {};
  for (const [key, val] of Object.entries(translations)) {
    // val имеет тип Record<Locale, string>, нужно уточнить
    const typedVal = val as Record<Locale, string>;
    messages[key] = typedVal[locale] || typedVal["en"] || "";
  }
  return messages;
}

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const detectedLocale = location.pathname.split("/")[1] as Locale;
  const [locale, setLocale] = useState<Locale>(
    supportedLocales.includes(detectedLocale) ? detectedLocale : "en"
  );

  useEffect(() => {
    const next = location.pathname.split("/")[1] as Locale;
    if (supportedLocales.includes(next)) {
      setLocale(next);
      document.documentElement.lang = next;
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    }
  }, [location]);

  const messages = getMessagesForLocale(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages} defaultLocale="en">
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
