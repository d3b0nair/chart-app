import React from "react";
import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import CheckPoint from "./../../icons/CheckPoint.svg";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {advantages.map(({ title, description, _id }) => {
        return (
          <div className={styles.advantage} key={_id}>
            <CheckPoint className={styles.checkPointSvg} />
            <div className={styles.title}>{title}</div>
            <hr className={styles.vertLine} />
            <div className={styles.description}>{description}</div>
          </div>
        );
      })}
    </div>
  );
};
