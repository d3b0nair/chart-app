import React from "react";
import { HhDataProps } from "./HhData.props";
import styles from "./HhData.module.css";
import RateIcon from "../../icons/Star.svg";
import { Card } from "..";
import { priceToRub } from "../../helpers/helpers";

export const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.statCount}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{priceToRub(juniorSalary)}</div>
          <div className={styles.rating}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>

        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{priceToRub(middleSalary)}</div>
          <div className={styles.rating}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>

        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{priceToRub(seniorSalary)}</div>
          <div className={styles.rating}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
