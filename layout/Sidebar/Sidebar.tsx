import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import styles from "./Sidebar.module.css";
import { Menu } from "../Menu/Menu";
import Logo from "../Logo.svg";
import { Search } from "../../components";
import Link from "next/link";
export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href="/">
        <a aria-label="Перейти на главную страницу">
          <Logo />
        </a>
      </Link>
      <Search />
      <Menu />
    </div>
  );
};
