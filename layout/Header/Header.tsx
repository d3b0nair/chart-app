import { HeaderProps } from "./Header.props";
import cn from "classnames";
import Logo from "../Logo.svg";
import styles from "./Header.module.css";
import { ButtonIcon } from "../../components";
import { motion, useReducedMotion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setIsOpened(false);
  }, [router]);
  const shouldRedcueMotion = useReducedMotion();

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldRedcueMotion ? 1 : 0,
      x: "100%",
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      {isOpened ? (
        <ButtonIcon
          aria-label="Открыть навигацию"
          className={styles.menuClose}
          appearance="white"
          icon="closeIcon"
          onClick={() => setIsOpened(false)}
        />
      ) : (
        <>
          <Logo />
          <ButtonIcon
            className={styles.menuOpen}
            appearance="white"
            icon="hamburgerIcon"
            onClick={() => setIsOpened(true)}
          />
        </>
      )}
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={"closed"}
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
      </motion.div>
    </header>
  );
};
