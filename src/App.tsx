import { useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import translations from "../translations.json";
import { getCookie } from "./lib";
import { geoService } from "./lib/geo-service";

import {
  ArticleAr,
  ArticleCss,
  ArticleEn,
  ArticleI18nKz,
  ArticleL10nRu,
  ArticleRtlIcons,
  ArticleUiBy,
  Home,
} from "./pages";

const supportedLocales = ["en", "ru", "ar"] as const;
type Locale = (typeof supportedLocales)[number];

function getMessagesForLocale(
  allTranslations: Record<string, Record<string, string>>,
  locale: string
): Record<string, string> {
  const messages: Record<string, string> = {};
  for (const [key, translationsByLang] of Object.entries(allTranslations)) {
    messages[key] = translationsByLang[locale] || translationsByLang["en"] || "";
  }
  return messages;
}

async function detectLocale(): Promise<Locale> {
  // 1. From URL
  const urlLocaleMatch = window.location.pathname.match(/^\/(en|ru|ar)(\/|$)/);
  if (urlLocaleMatch?.[1]) return urlLocaleMatch[1] as Locale;

  // 2. From Cookie
  const cookieLocale = getCookie("i18n-l10n-conf-lang");
  if (supportedLocales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 3. From browser
  const browserLang = navigator.language.split("-")[0];
  if (supportedLocales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  // 4. From geo-service
  try {
    const region = geoService.getCurrentRegion(window.location.search);
    if (region === "RU") return "ru";
    if (["AE", "SA", "EG"].includes(region)) return "ar";
  } catch (err) {
    console.warn("GeoService failed", err);
  }

  return "en"; // Fallback
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppRoutes({ locale }: { locale: Locale }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${locale}`} replace />} />
      <Route path="/:locale">
        <Route index element={<Home />} />
        <Route path="article/rtl-icons" element={<ArticleRtlIcons />} />
        <Route path="article/css" element={<ArticleCss />} />
        <Route path="article/l10n-ru" element={<ArticleL10nRu />} />
        <Route path="article/ui-by" element={<ArticleUiBy />} />
        <Route path="article/i18n-kz" element={<ArticleI18nKz />} />
        <Route path="article/en" element={<ArticleEn />} />
        <Route path="article/ar" element={<ArticleAr />} />
        <Route path="*" element={<Navigate to={`/${locale}`} replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale | null>(null);

  useEffect(() => {
    detectLocale().then((detected) => {
      setLocale(detected);
      document.documentElement.lang = detected;
      document.documentElement.dir = detected === "ar" ? "rtl" : "ltr";
    });
  }, []);

  const messages = useMemo(() => {
    return locale ? getMessagesForLocale(translations, locale) : {};
  }, [locale]);

  if (!locale) return null; // Or show loader

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes locale={locale} />
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
