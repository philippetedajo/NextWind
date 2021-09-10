import axios from "axios";
import { FetcherProps, Response } from "../_types/fetcher_types";

//normalize the response if necessary
const responder = (type: string, message: string, data = null) => {
  let response = { type: type, message: message, data: data };
  // for debugging response :
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
      method: options.method,
      data: options.input,
      headers: header,
    });

    switch (result.data.code) {
      case 200:
        return responder(
          Response.SUCCESS,
          result.data.message,
          result.data.data
        );
      default:
        return responder(Response.OTHER, result.data.message, result.data.data);
    }
  } catch (error) {
    console.log("API Not functional");
    throw new Error(error);
  }
};
