import type { GetStaticProps, NextPage } from "next";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";
import { MainPageComponent } from "../page-components/MainPageComponent/MainPageComponent";

const Home: NextPage<HomeProps> = (): JSX.Element => {
  return <MainPageComponent />;
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return { props: { menu, firstCategory } };
};

export interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
