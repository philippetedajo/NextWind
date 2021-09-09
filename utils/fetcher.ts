import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const fetcher = () => {
  axios.interceptors.request.use((req: AxiosRequestConfig) => {
    console.log(req);
    return req;
  });

  axios.interceptors.response.use((res: AxiosResponse) => {
    console.log(res);
    return res;
  });
};
