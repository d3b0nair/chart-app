import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
} from "react";

import { RatingProps } from "./Rating.props";
import cn from "classnames";

import StarIcon from "./../../icons/Star.svg";
import styles from "./Rating.module.css";

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      error,
      setRating,
      className,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRattingAray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);
    useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating, tabIndex]);

    const computeFocus = (rating: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i === 0) {
        return tabIndex ?? 0;
      }
      if (rating === i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map(
        (_rating: JSX.Element, index: number) => {
          return (
            <span
              className={cn(styles.star, className, {
                [styles.filled]: index < currentRating,
                [styles.editable]: isEditable,
              })}
              onMouseEnter={() => changeDisplay(index + 1)}
              onMouseLeave={() => changeDisplay(rating)}
              onClick={() => onClick(index + 1)}
              tabIndex={computeFocus(rating, index)}
              onKeyDown={(evt: KeyboardEvent) => handleKey(evt)}
              ref={(r) => ratingArrayRef.current?.push(r)}
              role={isEditable ? "slider" : ""}
              aria-valuenow={rating}
              aria-invalid={error ? true : false}
              aria-valuemax={5}
              aria-valuemin={1}
              aria-label={isEditable ? "Укажите рейтинг" : "рейтинг" + rating}
            >
              <StarIcon />
            </span>
          );
        }
      );
      setRattingAray(updatedArray);
    };

    const changeDisplay = (index: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(index);
    };

    const onClick = (index: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(index);
    };

    const handleKey = (evt: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (evt.code === "ArrowRight" || evt.code === "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          evt.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (evt.code === "ArrowLeft" || evt.code === "ArrowDown") {
        evt.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        className={cn(styles.ratingWrapper, { [styles.error]: error })}
        {...props}
        ref={ref}
      >
        {ratingArray.map((rating, index) => (
          <span key={index}>{rating}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMsg}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
