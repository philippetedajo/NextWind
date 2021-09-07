import React, { useState } from "react";
import axios, { Method } from "axios";

interface UseAxiosProps {
  url: string;
  method?: Method;
  input?: object;
  token?: string;
}

export const useAxios = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState({});

  const getData = (options: UseAxiosProps) => {
    let header = { "Content-Type": "application/json" };
    if (options.token) header["Authorization"] = options.token;

    // for debugging input:
    // console.log(options.input)

    setIsLoading(true);
    axios({
      url: options.url,
      method: options.method,
      data: options.input,
      headers: header,
    })
      .then((response) => {
        //if response status is 200 set data else throw new error
        if (response?.status === 200) {
          setData(response.data);
          setIsLoading(false);
        } else throw new Error("API Not functional");
      })
      .then((error: any) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return { data, isLoading, error, getData };
};
