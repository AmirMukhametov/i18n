import type { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { BRAND_NAMES } from "@/constants";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";

import { LangSelect } from "../lang-select";
import styles from "./styles.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const yearStart = 2024;
    const yearEnd = 2025;
    const brand = BRAND_NAMES["ru"];

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <Link className={styles.headerBrand} to="/">
                        <BrandLogoIcon />

                        <span className={styles.headerBrandText}>
                            {brand}
                        </span>
                    </Link>

                    <LangSelect />
                </div>
            </div>

            <div className={styles.contentContainer}>{children}</div>

            <div className={styles.footer}>
                <div
                    className={styles.footerSocialLinks}
                    data-testid="social-icons"
                >
                    {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                        <a key={index} href="">
                            <Icon />
                        </a>
                    ))}
                </div>

                <span className={styles.footerText}>
                    <FormattedMessage
                        id="layout.footer.copyright"
                        defaultMessage="© {yearStart}-{yearEnd}, ООО «<link>{brand}</link>». Все права защищены"
                        values={{
                            yearStart,
                            yearEnd,
                            brand,
                            link: (chunks: React.ReactNode) => (
                                <a className={styles.textLink} href="/">
                                    {chunks}
                                </a>
                            ),
                        }}
                    />
                </span>
            </div>
        </>
    );
};
