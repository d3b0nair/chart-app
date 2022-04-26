import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useState, KeyboardEvent, MouseEvent, TouchEvent } from "react";
import SearchIcon from "./../../icons/Search.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const dispatchSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: query,
      },
    });
  };
  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Enter") {
      dispatchSearch();
    }
  };
  const handleClick = (evt: MouseEvent | TouchEvent) => {
    evt.preventDefault();
    dispatchSearch();
  };
  return (
    <form className={cn(className, styles.search)} role="search" {...props}>
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
        onClick={handleClick}
        aria-label="Искать по сайту"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
