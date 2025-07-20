import { type FC } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import articleAr from "@/assets/article-ar.jpg";
import articleCss from "@/assets/article-css.jpg";
import articleEn from "@/assets/article-en.jpg";
import articleI18nKz from "@/assets/article-i18n-kz.jpg";
import articleL10nRu from "@/assets/article-l10n-ru.jpg";
import articleRtlIcons from "@/assets/article-rtl-icons.jpg";
import articleUiBy from "@/assets/article-ui-by.jpg";
import { Layout } from "@/components";
import type { Locale } from "@/types";

import styles from "./styles.module.css";

const ARTICLES = [
    {
        id: "rtlArticle",
        imageUrl: articleRtlIcons,
        articleLink: "article/rtl-icons",
    },
    {
        id: "cssArticle",
        imageUrl: articleCss,
        articleLink: "article/css",
    },
];

const getRegionArticleByLocale = (locale: Locale) => {
    switch (locale) {
        case "ru":
        case "ru-RU":
            return {
                id: "ruArticle",
                imageUrl: articleL10nRu,
                articleLink: "article/l10n-ru",
            };
        case "ru-BY":
            return {
                id: "byArticle",
                imageUrl: articleUiBy,
                articleLink: "article/ui-by",
            };
        case "ru-KZ":
            return {
                id: "kzArticle",
                imageUrl: articleI18nKz,
                articleLink: "article/i18n-kz",
            };
        case "ar":
            return {
                id: "arArticle",
                imageUrl: articleAr,
                articleLink: "article/ar",
            };
        case "en":
        default:
            return {
                id: "enArticle",
                imageUrl: articleEn,
                articleLink: "article/en",
            };
    }
};

export const Home: FC = () => {
    const intl = useIntl();
    const { locale } = intl;
    const { id, imageUrl, articleLink } = getRegionArticleByLocale(locale as Locale);

    return (
        <Layout>
            <main className={styles.content}>
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        <FormattedMessage id="homePage.hero.title" />
                    </h1>

                    <div className={styles.heroDetails}>
                        <span className={styles.heroDetailsItem}>
                            <FormattedMessage
                                id="homePage.hero.conference"
                                values={{ year: 2025 }}
                            />
                        </span>
                        <span className={styles.heroDetailsItem}>
                            15 августа 2025 г.
                        </span>
                        <span className={styles.heroDetailsItem}>
                            <FormattedMessage id="homePage.hero.location" />
                        </span>
                        <span className={styles.heroDetailsItem}>
                            <FormattedMessage
                                id="homePage.hero.price"
                                values={{ price: "35 000,00 ₽" }}
                            />
                        </span>
                    </div>

                    <a className={styles.heroRegister} href="">
                        <FormattedMessage id="homePage.hero.register" />
                    </a>
                </section>

                <section className={styles.regionArticle}>
                    <h2 className={styles.regionArticleTitle}>
                        <FormattedMessage id="homePage.regionArticle.title" />
                    </h2>

                    <Link className={styles.articleCard} to={articleLink}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>
                                <FormattedMessage id={`homePage.${id}.title`} />
                            </h3>
                            <p className={styles.cardDescription}>
                                <FormattedMessage id={`homePage.${id}.description`} />
                            </p>
                            <span className={styles.cardRead}>
                                <FormattedMessage id="homePage.article.read" />
                            </span>
                        </div>
                        <img className={styles.cardImage} src={imageUrl} />
                    </Link>
                </section>

                <section className={styles.articles}>
                    <h2 className={styles.articlesTitle}>
                        <FormattedMessage id="homePage.articles.title" />
                    </h2>

                    {ARTICLES.length > 0 && (
                        <p className={styles.articlesDescription}>
                            <FormattedMessage
                                id="homePage.articles.description"
                                values={{ count: ARTICLES.length }}
                            />
                        </p>
                    )}

                    <div className={styles.articlesList}>
                        {ARTICLES.map(({ id, imageUrl, articleLink }, index) => (
                            <Link
                                key={index}
                                className={styles.articleCard}
                                to={articleLink}
                            >
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>
                                        <FormattedMessage id={`homePage.${id}.title`} />
                                    </h3>
                                    <p className={styles.cardDescription}>
                                        <FormattedMessage id={`homePage.${id}.description`} />
                                    </p>
                                    <span className={styles.cardRead}>
                                        <FormattedMessage id="homePage.article.read" />
                                    </span>
                                </div>
                                <img className={styles.cardImage} src={imageUrl} />
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
};