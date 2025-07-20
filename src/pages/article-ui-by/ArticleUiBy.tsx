import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleUiBy: FC = () => (
    <Layout>
        <main className={styles.article}>
            <h1>
                <FormattedMessage
                    id="articleUiBy.title"
                    defaultMessage="Двухъязычный интерфейс: как учесть русский и белорусский языки в
                    одном продукте"
                />
                
            </h1>

            <p>
                <FormattedMessage
                    id="articleUiBy.text"
                    defaultMessage="Создание интерфейса для Беларуси — это вызов двуязычия. Продукт
                    должен быть понятен и русскоязычным, и белорусскоязычным
                    пользователям. Мы рассматриваем, как организовать структуру
                    переводов, какие существуют UX-решения для переключения языка и
                    почему важно уделять внимание аутентичности белорусского
                    контента."
                />                              
            </p>
        </main>
    </Layout>
);
