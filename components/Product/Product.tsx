import { ProductProps } from "./Product.props";
import cn from "classnames";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceToRub } from "../../helpers/helpers";
import { Divider } from "../Divider/Divider";
import { forwardRef, useRef, useState, ForwardedRef } from "react";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { motion } from "framer-motion";
import Image from "next/image";

export const Product = motion(
  forwardRef(
    (
      { product, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 },
      };

      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        reviewRef.current?.focus();
      };
      return (
        <div {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className="visuallyHidden">Цена</span>
                {priceToRub(product.price)}
              </span>
              {product.oldPrice ? (
                <Tag className={styles.discount} color="green">
                  <span>
                    <span className="visuallyHidden">Скидка</span>
                    {priceToRub(product.price - product.oldPrice)}
                  </span>
                </Tag>
              ) : null}
            </div>

            {product.credit ? (
              <div className={styles.creditRate}>
                <span>
                  <span className="visuallyHidden">Рассрочка</span>
                  {priceToRub(product.credit)}
                  <span className="visuallyHidden">в месяц</span>
                  <span className={styles.month} aria-hidden={true}>
                    /мес
                  </span>
                </span>
              </div>
            ) : null}
            <div className={styles.rating}>
              <span className="visuallyHidden">
                {"рейтинг" +
                <Rating rating={product.reviewAvg ?? product.initialRating} />}
              </span>

              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((category) => (
                <Tag key={category} color="ghost" className={styles.category}>
                  {category}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            {product.credit ? (
              <div className={styles.creditTitle} aria-hidden={true}>
                кредит
              </div>
            ) : null}
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}
                {declOfNum(product.reviewCount, [
                  " отзыв",
                  " отзыва",
                  " отзывов",
                ])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            {product.characteristics && (
              <div
                style={
                  product.advantages || product.disadvantages
                    ? {}
                    : { gridColumn: "1 / -1" }
                }
                className={styles.feature}
              >
                {product.characteristics.map((char) => (
                  <div
                    style={
                      product.advantages || product.disadvantages
                        ? {}
                        : { paddingRight: 0 }
                    }
                    key={char.name}
                    className={styles.characteristics}
                  >
                    <span className={styles.characteristicsName}>
                      {char.name}
                    </span>
                    <span className={styles.characteristicsDots}></span>
                    <span className={styles.characteristicsValue}>
                      {char.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {(product.advantages || product.disadvantages) && (
              <div className={styles.prosAndCons}>
                {product.advantages && (
                  <div className={styles.pros}>
                    <div className={styles.prosAndConsTitle}>Преимущества</div>
                    <div>{product.advantages}</div>
                  </div>
                )}
                {product.disadvantages && (
                  <div className={styles.cons}>
                    <div className={styles.prosAndConsTitle}>Недостатки</div>
                    <div>{product.disadvantages}</div>
                  </div>
                )}
              </div>
            )}
            {product.html && (
              <>
                <Divider className={cn(styles.hr1)} />
                <div
                  className={styles.seo}
                  dangerouslySetInnerHTML={{ __html: product.html }}
                ></div>
              </>
            )}

            <Divider className={cn(styles.hr2)} />

            <div className={styles.actions}>
              <a tabIndex={-1} href={product.link} target="_blank">
                <Button appearance="primary">Узнать подробнее</Button>
              </a>
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            className={styles.reviewsWrapper}
            animate={isReviewOpened ? "visible" : "hidden"}
            variants={variants}
            initial={"hidden"}
          >
            <Card
              color="blue"
              className={styles.reviews}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <Review review={review} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
