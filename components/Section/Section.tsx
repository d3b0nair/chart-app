import { SectionProps } from "./Section.props";
import cn from "classnames";
import styles from "./Section.module.css";

export const Section = ({
  size = "small",
  children,
  className,
  ...props
}: SectionProps): JSX.Element => {
  return (
    <p
      className={cn(styles.section, className, {
        [styles.small]: size === "small",
        [styles.medium]: size === "medium",
        [styles.large]: size === "large",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
