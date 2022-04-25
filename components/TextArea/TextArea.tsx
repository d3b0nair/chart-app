import { TextAreaProps } from "./TextArea.props";
import cn from "classnames";
import styles from "./TextArea.module.css";
import { forwardRef, ForwardedRef } from "react";

export const TextArea = forwardRef(
  (
    { className, error, ...props }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, styles.textareaWrapper)}>
        <textarea
          className={cn(className, styles.textArea)}
          ref={ref}
          {...props}
        />
        {error && (
          <span role="alert" className={styles.errorMsg}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
