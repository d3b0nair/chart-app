import { SortEnum, SortProps } from "./Sort.props";
import cn from "classnames";
import styles from "./Sort.module.css";
import SortIcon from "./../../icons/Sort.svg";

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id="sort">
        Сортировка
      </div>
      <button
        id="rating"
        aria-selected={sort === SortEnum.Rating}
        aria-describedby="sort rating"
        tabIndex={1}
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({ [styles.active]: sort === SortEnum.Rating })}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id="price"
        aria-selected={sort === SortEnum.Price}
        aria-describedby="sort price"
        tabIndex={1}
        onClick={() => setSort(SortEnum.Price)}
        className={cn({ [styles.active]: sort === SortEnum.Price })}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};
