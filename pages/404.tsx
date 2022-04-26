import { NextPage } from "next";
import { withLayout } from "../layout/Layout";
import { Error } from "../components";

export const Erorr404: NextPage = (): JSX.Element => {
  return <Error errorMsg={"Страница не существует"} errorCode={404} />;
};

export default withLayout(Erorr404);
