import { FooterProps } from "./Footer.props";
import cn from "classnames";
import styles from "./Footer.module.css";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div className={cn(styles.copyright)}>
        ChartApp © {new Date().getFullYear()} Все права защищены
      </div>
      <a className={cn(styles.tos)} href="#" target="_blank">
        Пользовательское соглашение
      </a>
      <a className={cn(styles.privacyPolicy)} href="#" target="_blank">
        Политика конфиденциальности
      </a>
    </footer>
  );
};
