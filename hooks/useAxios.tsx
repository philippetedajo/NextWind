import React, { useEffect, useState } from "react";
import axios, { Method } from "axios";

interface UseAxiosProps {
  options: { url: string; method?: Method; input?: object; token?: string };
  immediate?: boolean;
}

export const useAxios = ({ options, immediate = false }: UseAxiosProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState({});

  const executeFetch = () => {
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
        setData(response);
        setIsLoading(false);
      })
      .then((error: any) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (immediate) {
      executeFetch();
    }
  }, [immediate]);

  return { data, isLoading, error, executeFetch };
};
