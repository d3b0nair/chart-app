import { ProductOverviewProps } from "./ProductOverview.props";
import styles from "./ProductOverview.module.css";
import { Card } from "../Card/Card";
import { priceToRub } from "../../helpers/helpers";
import StarIcon from "../../icons/Star.svg";
import { Button } from "..";
import { motion } from "framer-motion";
import { forwardRef, ForwardedRef } from "react";
import cn from "classnames";
import Image from "next/image";

export const ProductOverview = motion(
  forwardRef(
    (
      { product, ...props }: ProductOverviewProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      return (
        <div {...props} ref={ref}>
          <Card className={styles.ProductOverviewCard}>
            <div className={cn(styles.prodIconAndTitle, styles.longCell)}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={40}
                height={40}
              />
              <div className={styles.title}>
                <div>{product.title}</div>
              </div>
            </div>
            <div className={cn(styles.mediumCell)}>
              <div className={styles.displayOnMobile}>ДЛИТЕЛЬНОСТЬ</div>
              <div>
                <span>
                  <span className="visuallyHidden">ДЛИТЕЛЬНОСТЬ</span>
                  {product.characteristics && product.characteristics[3]
                    ? product.characteristics[3].value
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className={cn(styles.mediumCell)}>
              <div className={styles.displayOnMobile}>ЦЕНА</div>
              <span>
                <span className="visuallyHidden">Цена</span>
                {priceToRub(product.price)}
              </span>
            </div>
            <div className={cn(styles.mediumCell)}>
              <div className={styles.displayOnMobile}>РАССРОЧКА</div>
              <span>
                <span className="visuallyHidden">РАССРОЧКА</span>
                {product.credit ? priceToRub(product.credit) : "Нет"}
              </span>
            </div>
            <div className={cn(styles.mediumCell)}>
              <div className={styles.displayOnMobile}>РЕЙТИНГ</div>
              <StarIcon />
              <div>
                <span>
                  <span className="visuallyHidden">РЕЙТИНГ</span>
                  {product.reviewAvg ?? product.initialRating}
                  <span className="visuallyHidden">из пяти.</span>
                </span>
              </div>
            </div>
            <div className={cn(styles.mediumCell)}>
              <a tabIndex={-1} href={product.link} target="_blank">
                <Button appearance="primary">Узнать подробнее</Button>
              </a>
            </div>
          </Card>
        </div>
      );
    }
  )
);
