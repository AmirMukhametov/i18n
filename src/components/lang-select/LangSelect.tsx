// src/components/lang-select/LangSelect.tsx

import { type FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SUPPORTED_LANGS } from "@/constants";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
  ru: "Русский",
  en: "English",
  ar: "اَلْعَرَبِيَّةُ",
};

export const LangSelect: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { locale = "en" } = useParams<{ locale: Lang }>();
  const langSelectRef = useClickOutside<HTMLDivElement>(() => setShowMenu(false));

  const handleLangChange = (lang: Lang) => {
    const pathWithoutLocale = window.location.pathname.replace(/^\/[a-z]{2}/, "");
    navigate(`/${lang}${pathWithoutLocale}`);
    setShowMenu(false);
  };

  return (
    <div className={styles.langSelect} ref={langSelectRef}>
      <button
        className={styles.langSelectButton}
        onClick={() => setShowMenu((prev) => !prev)}
        data-testid="lang-select-button"
      >
        <span className={styles.langSelectText}>{LANG_LABEL[locale]}</span>
        <EarthIcon />
      </button>

      {showMenu && (
        <ul className={styles.langSelectMenu} data-testid="lang-select-menu">
          {SUPPORTED_LANGS.map((lang) => (
            <li
              key={lang}
              className={styles.langSelectMenuItem}
              onClick={() => handleLangChange(lang)}
            >
              <span className={styles.langSelectMenuItemText}>
                {LANG_LABEL[lang]}
              </span>
              {lang === locale && <DoneIcon />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
