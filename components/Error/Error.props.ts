import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ErrorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  errorMsg: string;
  errorCode: number;
}
