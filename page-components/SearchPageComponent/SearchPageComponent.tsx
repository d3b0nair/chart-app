import { SearchPageComponentProps } from "./SearchPageComponent.props";
import styles from "./SearchPageComponent.module.css";
import { Button, Card, Section, Tag } from "../../components";
import Link from "next/link";

export const SearchPageComponent = ({
  result,
  query,
}: SearchPageComponentProps): JSX.Element => {
  return (
    <div className={styles.searchListWrapper}>
      <Section className={styles.searchInfo}>
        По запросу <b>{query}</b> найдено <b>{result?.length}</b> страниц
      </Section>
      {result?.map((item) => (
        <Card key={item._id} className={styles.searchResult}>
          <Section size="large" className={styles.searchTitle}>
            {item.title}
          </Section>
          <Tag color="ghost" className={styles.category}>
            {item.secondCategory}
          </Tag>
          <Link href={`/courses/${item.alias}`}>
            <a className={styles.actionButton}>
              <Button appearance={"primary"}>Перейти</Button>
            </a>
          </Link>
        </Card>
      ))}
    </div>
  );
};
