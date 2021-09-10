import { Method } from "axios";

export interface FetcherProps {
  url: string;
  method?: Method;
  input?: object;
  token?: string;
}

export enum FetcherResponse {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  OTHER = "OTHER",
}
