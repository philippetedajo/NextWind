import axios, { Method } from "axios";

interface fetcherProps {
  url: string;
  method?: Method;
  input?: object;
  token?: string;
}

//normalize the response if necessary
const responder = (type = false, message = "", data = null) => {
  return { type: type, message: message, data: data };
};

//get data from api
const fetcher = async (options: fetcherProps) => {
  let header = { "Content-Type": "application/json" };
  if (options.token) header["Authorization"] = options.token;

  // for debugging input:
  // console.log(options.input)

  try {
    let response = await axios({
      url: options.url,
      method: options.method,
      data: options.input,
      headers: header,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API Not functional");
    throw new Error(error);
  }
};
