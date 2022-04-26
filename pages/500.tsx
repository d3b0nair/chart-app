import { NextPage } from "next";
import { withLayout } from "../layout/Layout";
import { Error } from "../components";

export const Erorr500: NextPage = (): JSX.Element => {
  return <Error errorMsg={"Ошибка сервера"} errorCode={500} />;
};

export default withLayout(Erorr500);
