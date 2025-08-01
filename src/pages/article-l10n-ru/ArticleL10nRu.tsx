import { type FC } from "react";
import { FormattedMessage } from "react-intl";


import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleL10nRu: FC = () => (
    <Layout>
        <main className={styles.article}>
            <h1>
                <FormattedMessage
                    id="articleL10nRu.title"
                    defaultMessage="Как адаптировать веб-приложение под российских пользователей:
                    нюансы локализации"
                />               
            </h1>

            <p>
                <FormattedMessage
                    id="articleL10nRu.text1"
                    defaultMessage="Российская аудитория — одна из крупнейших в Восточной Европе, с
                    более чем 98 000 000 интернет-пользователей. При этом около 78 %
                    предпочитают сайты на русском языке. При локализации важно
                    учитывать форматы чисел (например, десятичный разделитель —
                    запятая), валют и дат."
                />               
            </p>

            <p>
                <FormattedMessage
                    id="articleL10nRu.text2"
                    defaultMessage=" Также стоит обращать внимание на юридические аспекты: закон о
                    персональных данных требует хранения информации на серверах
                    внутри страны. Многие компании перешли на соответствие этому
                    требованию ещё с 1 сентября 2015 г."
                />                   
            </p>
        </main>
    </Layout>
);
