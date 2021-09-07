import React, { useState } from "react";
import axios, { Method } from "axios";

interface UseAxiosProps {
  url: string;
  method?: Method;
  input?: object;
  token?: string;
}

//normalize the response if necessary
const responder = (type = false, message = "", data = null) => {
  return { type: type, message: message, data: data };
};

export const useAxios = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState({});

  //get data from api
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
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .then((error: any) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return { data, isLoading, error, getData };
};
