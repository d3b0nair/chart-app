import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";
import { PageModel } from "../interfaces/page.interface";
import { useRouter } from "next/router";
import { SearchPageComponent } from "../page-components";
import ContentLoader from "react-content-loader";
import { Htag } from "../components";

function Search(): JSX.Element {
  const Loader = () => (
    <ContentLoader
      speed={2}
      viewBox="0 0 280 230"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="8" rx="5" ry="5" width="220" height="5" />
      <rect x="0" y="15" rx="5" ry="5" width="280" height="26" />
      <rect x="0" y="46" rx="5" ry="5" width="280" height="26" />
      <rect x="0" y="77" rx="5" ry="5" width="280" height="26" />
      <rect x="0" y="108" rx="5" ry="5" width="280" height="26" />
      <rect x="0" y="139" rx="5" ry="5" width="280" height="26" />
    </ContentLoader>
  );
  const [result, setResult] = useState<Array<PageModel>>();
  const router = useRouter();
  useEffect(() => {
    if (!router.query.q) {
      return;
    }
    const body = {
      firstCategory: 0,
      text: router.query.q,
    };
    const lookUpQuery = async (body: {
      firstCategory: number;
      text: string | string[];
    }) => {
      try {
        const { data } = await axios.post<PageModel[]>(
          API.topPage.textSearch,
          body
        );
        console.log(data);
        setResult(data);
      } catch (e) {
        console.log(e);
      }
    };
    lookUpQuery(body);
  }, [router.query.q]);

  return (
    <>
      <Htag tag={"h1"}>Поиск:</Htag>
      {result && router.query.q ? (
        <SearchPageComponent result={result} query={router.query.q} />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
