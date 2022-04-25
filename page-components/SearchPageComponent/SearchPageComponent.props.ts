import { PageModel } from "../../interfaces/page.interface";

export interface SearchPageComponentProps {
  result: Array<PageModel>;
  query: string | string[];
}
