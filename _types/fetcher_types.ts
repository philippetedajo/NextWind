import { Method } from "axios";

export interface FetcherProps {
  url: string;
  method?: Method;
  input?: object;
  token?: string;
  internalApi?: boolean;
}

export enum Response {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}
