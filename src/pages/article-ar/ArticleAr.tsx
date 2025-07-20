import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleAr: FC = () => (
    <Layout>
        <main className={styles.article}>
            <h1>
                <FormattedMessage 
                    id="articleAr.title"
                    defaultMessage='Локализация для арабоязычного мира: RTL, форматы и культурные коды'
                />
            </h1>

            <p>
                <FormattedMessage 
                    id="articleAr.text"
                    defaultMessage='Интерфейсы на арабском языке требуют переосмысления привычного
                    порядка элементов: направление письма меняется на RTL. В статье
                    мы объясняем, как грамотно адаптировать верстку, типографику и
                    иконки, чтобы интерфейс выглядел естественно для арабоязычных
                    пользователей, и при этом оставался универсальным.'
                />              
            </p>
        </main>
    </Layout>
);
