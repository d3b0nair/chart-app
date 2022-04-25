import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useState, KeyboardEvent } from "react";
import SearchIcon from "./../../icons/Search.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const dispatchSearch = () => {
    router.push({ pathname: "/search", query: { q: query } });
  };
  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Enter") {
      dispatchSearch();
    }
  };
  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={dispatchSearch}
        aria-label="Искать по сайту"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
