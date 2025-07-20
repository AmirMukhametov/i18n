import { IntlProvider } from "react-intl";
import translations from "../translations.json";

import { type FC, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function getMessagesForLocale(
  allTranslations: Record<string, Record<string, string>>,
  locale: string
): Record<string, string> {
  const messages: Record<string, string> = {};

  Object.entries(allTranslations).forEach(([key, translationsByLang]) => {
    if (translationsByLang[locale]) {
      messages[key] = translationsByLang[locale];
    } else {
      messages[key] = translationsByLang["en"] || "";
    }
  });

  return messages;
}

function App() {
  const [locale, setLocale] = useState<"en" | "ru" | "ar">("en");

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={getMessagesForLocale(translations, locale)}
      defaultLocale="en"
    >
      <BrowserRouter>
        <ScrollToTop />

        <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <button onClick={() => setLocale("en")} disabled={locale === "en"}>
            English
          </button>
          <button onClick={() => setLocale("ru")} disabled={locale === "ru"} style={{ marginLeft: 10 }}>
            Русский
          </button>
          <button onClick={() => setLocale("ar")} disabled={locale === "ar"} style={{ marginLeft: 10 }}>
            العربية
          </button>
        </div>

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="article">
              <Route path="rtl-icons" element={<ArticleRtlIcons />} />
              <Route path="css" element={<ArticleCss />} />
              <Route path="l10n-ru" element={<ArticleL10nRu />} />
              <Route path="ui-by" element={<ArticleUiBy />} />
              <Route path="i18n-kz" element={<ArticleI18nKz />} />
              <Route path="en" element={<ArticleEn />} />
              <Route path="ar" element={<ArticleAr />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
