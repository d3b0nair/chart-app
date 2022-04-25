import styles from "./MainPageComponent.module.css";
import { Card, Htag } from "../../components";
import Link from "next/link";
import { firstLevelMenu } from "../../helpers/helpers";

export const MainPageComponent = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <div className={styles.mainText}>
        <Htag tag={"h1main"}>Обучайся с нами!</Htag>
        <Htag tag={"h2"}>
          Подборки лучших курсов и рейтинги, основанные на реальных отзывах.
        </Htag>
      </div>
      <div className={styles.cardsWrapper}>
        {firstLevelMenu.map((menuItem) => (
          <Card key={menuItem.id} className={styles.card}>
            <div className={styles.icon}>{menuItem.icon}</div>
            <div className={styles.link}>
              <Link href={`/${menuItem.route}`}>
                <a>{menuItem.name}</a>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      <div className={styles.hero} />
    </div>
  );
};
