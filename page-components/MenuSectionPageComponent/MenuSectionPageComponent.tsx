import { MenuSectionPageComponentProps } from "./MenuSectionPageComponent.props";
import styles from "./MenuSectionPageComponent.module.css";
import { Card, Divider, Htag } from "../../components";
import Link from "next/link";
import { useRouter } from "next/router";

export const MenuSectionPageComponent = ({
  menu,
}: MenuSectionPageComponentProps): JSX.Element => {
  const { asPath } = useRouter();

  return (
    <div className={styles.categoryWrapper}>
      {menu &&
        menu.flatMap((menuItem) => (
          <Card key={menuItem._id.secondCategory} className={styles.card}>
            <Htag tag={"h2"}>{menuItem._id.secondCategory}</Htag>
            <Divider />
            <div className={styles.linkWrapper}>
              {menuItem.pages.map((page) => {
                return (
                  <Link href={`${asPath}/${page.alias}`} key={page._id}>
                    <a>{page.category}</a>
                  </Link>
                );
              })}
            </div>
          </Card>
        ))}
    </div>
  );
};
