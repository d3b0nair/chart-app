import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import styles from "./ReviewForm.module.css";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import CloseBtnSvg from "./../../icons/CloseBtn.svg";
import { Controller, useForm } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Unexpected error");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          tabIndex={isOpened ? 0 : -1}
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          placeholder="Имя"
          error={errors.name}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          tabIndex={isOpened ? 0 : -1}
          {...register("title", {
            required: { value: true, message: "Заполните заголовок" },
          })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: "Укажите рейтинг" },
            }}
            render={({ field }) => {
              return (
                <Rating
                  isEditable
                  ref={field.ref}
                  rating={field.value}
                  setRating={field.onChange}
                  error={errors.rating}
                  tabIndex={isOpened ? 0 : 1}
                />
              );
            }}
          ></Controller>
        </div>
        <TextArea
          tabIndex={isOpened ? 0 : 1}
          {...register("description", {
            required: { value: true, message: "Заполните описание" },
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isOpened ? 0 : 1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.successMsg, styles.msgPanel)} role="alert">
          <div className={styles.title}>Ваш отзыв отправлен</div>
          <div>Спасибо, Ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            aria-label="Закрыть оповещение"
          >
            <CloseBtnSvg />
          </button>
        </div>
      )}

      {error && (
        <div className={cn(styles.error, styles.msgPanel)} role="alert">
          <div className={styles.title}>Ошибка</div>
          <div>Что-то пошло не так. Попробуйте обновить страницу.</div>
          <button
            className={styles.close}
            onClick={() => setError(undefined)}
            aria-label="Закрыть оповещение"
          >
            <CloseBtnSvg />
          </button>
        </div>
      )}
    </form>
  );
};
