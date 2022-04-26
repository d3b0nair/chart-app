import styles from "./MainPageComponent.module.css";
import { Card, Htag } from "../../components";
import Link from "next/link";
import { firstLevelMenu } from "../../helpers/helpers";
import Hero from "../../public/Main.svg";

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
            <Link href={`/${menuItem.route}`} passHref>
              <div className={styles.link}>
                <a tabIndex={0}>{menuItem.name}</a>
              </div>
            </Link>
          </Card>
        ))}
      </div>
      <div className={styles.hero}>
        <Hero width="100%" height="100%" />
      </div>
    </div>
  );
};
