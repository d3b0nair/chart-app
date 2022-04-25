import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { HomeProps } from "../index";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../helpers/api";
import { MenuSectionPageComponent } from "../../page-components/MenuSectionPageComponent/MenuSectionPageComponent";

const Type: NextPage<TypeProps> = ({
  menu,
  firstCategory,
}: TypeProps): JSX.Element => {
  return <MenuSectionPageComponent menu={menu} firstCategory={firstCategory} />;
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((menuItem) => "/" + menuItem.route),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenu.find(
    (menuItem) => menuItem.route === params.type
  );
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  });
  return { props: { menu, firstCategory: firstCategoryItem.id } };
};

export interface TypeProps extends HomeProps {}
