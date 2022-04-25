import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import {
  Advantages,
  Card,
  HhData,
  Htag,
  Product,
  ProductOverview,
  Section,
  Sort,
  Tag,
} from "../../components";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { sortReducer } from "./sort.reducer";
import { useEffect, useReducer } from "react";
import { useReducedMotion } from "framer-motion";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );
  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products });
  }, [products]);

  const shouldRedcueMotion = useReducedMotion();

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };
  return (
    <div>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag
            className={styles.productCountTag}
            color="grey"
            size="medium"
            aria-label={products.length + "элементов"}
          >
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        <div className={styles.productOverviewLabels} aria-hidden={true}>
          <div className={styles.longCell}></div>
          <div className={styles.mediumCell}>ДЛИТЕЛЬНОСТЬ</div>
          <div className={styles.mediumCell}>ЦЕНА</div>
          <div className={styles.mediumCell}>РАССРОЧКА</div>
          <div className={styles.mediumCell}>РЕЙТИНГ</div>
          <div className={styles.mediumCell}></div>
        </div>
        <div role="list">
          {sortedProducts &&
            sortedProducts.map((product) => {
              return (
                <ProductOverview
                  role="listitem"
                  layout={shouldRedcueMotion ? false : true}
                  product={product}
                  key={product._id}
                />
              );
            })}
        </div>
        <div role="list">
          {sortedProducts &&
            sortedProducts.map((product) => {
              return (
                <Product
                  role="listitem"
                  layout={shouldRedcueMotion ? false : true}
                  product={product}
                  key={product._id}
                />
              );
            })}
        </div>
      </div>
      {firstCategory === 0 && (
        <>
          <div className={styles.hhTitle}>
            <Htag tag="h2">Вакансии - {page.category}</Htag>
            {products && (
              <Tag color="red" size="medium">
                hh.ru
              </Tag>
            )}
          </div>
          {firstCategory == TopLevelCategory.Courses && page.hh && (
            <HhData {...page.hh} />
          )}
          {page.advantages && page.advantages.length > 0 && (
            <>
              <Htag tag={"h2"}>Преимущества</Htag>
              <Advantages advantages={page.advantages} />
            </>
          )}
          {page.seoText && (
            <>
              <Htag tag={"h2"}>Описание</Htag>

              <Card
                className={styles.seo}
                dangerouslySetInnerHTML={{ __html: page.seoText }}
              />
            </>
          )}
          {page.qas && page.qas.length > 0 ? (
            <>
              <Htag tag={"h2"}>Частые вопросы</Htag>
              {page.qas.map(({ question, answer }) => (
                <Card key={question} className={styles.qas}>
                  <Htag tag={"h3"}>{question}</Htag>
                  <Section size="medium">{answer}</Section>
                </Card>
              ))}
            </>
          ) : null}
          {page.tags && (
            <>
              <Htag tag={"h2"}>Получаемые навыки</Htag>
              {page.tags.map((tagText) => {
                return (
                  <Tag
                    key={tagText}
                    size="medium"
                    color="primary"
                    className={styles.tag}
                  >
                    {tagText}
                  </Tag>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};
