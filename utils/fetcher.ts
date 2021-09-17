import axios from "axios";
import { FetcherProps, Response } from "../_types/fetcher_types";

//normalize the response if necessary
const responder = (type: string, message: string, data = null) => {
  let response = {
    type: type,
    message: message,
    data: data,
  };
  // for debugging formatted response :
  console.log(response);
  return response;
};

//get data from api
export const fetcher = async (options: FetcherProps) => {
  let header = { "Content-Type": "application/json" };
  if (options.token) header["Authorization"] = options.token;

  // for debugging input :
  // console.log(options.input)

  try {
    let result = await axios({
      url: options.url,
      method: options.method ?? "GET",
      data: options.input,
      headers: header,
    });

    // for debugging raw response :
    // console.log("result :", result);

    let formatResult: any = {};
    let isLoggedIn = result?.data?.isLoggedIn;

    if (options.internalApi) {
      formatResult = result.data.data;
    } else {
      formatResult = result.data;
    }

    switch (formatResult.code) {
      case 200:
        return responder(Response.SUCCESS, formatResult.message, {
          isLoggedIn,
          data: formatResult.data,
        });

      default:
        return responder(Response.FAILURE, formatResult.message, {
          isLoggedIn,
          data: formatResult.data,
        });
    }
  } catch (error) {
    console.log("API Not functional");
    throw new Error(error);
  }
};
