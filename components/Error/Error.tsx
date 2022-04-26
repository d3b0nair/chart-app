import { ErrorProps } from "./Error.props";
import styles from "./Error.module.css";
import { Button } from "../Button/Button";
import { Htag } from "../Htag/Htag";
import ErrorCanvas from "../../public/ErrorCanvas.svg";
import Link from "next/link";

export const Error = ({
  errorCode,
  errorMsg,
  ...props
}: ErrorProps): JSX.Element => {
  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.canvas}>
        <ErrorCanvas width="100%" height="100%" />
      </div>
      <div className={styles.action}>
        <Htag tag={"h1"}>{errorMsg}</Htag>
        <Htag tag={"h2"}>{errorCode} </Htag>
        <Link href="/">
          <a>
            <Button appearance={"primary"}>Перейти на главную</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};
