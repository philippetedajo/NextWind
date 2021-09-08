import { Progress } from "../components";
import { AuthProvider } from "../context";
import "../styles/globals.css";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

function MyApp({ Component, pageProps }) {
  const EmptyTemplate = ({ children }) => <>{children}</>;
  const Template = Component.Template || EmptyTemplate;
  Progress();

  axios.interceptors.request.use((req: AxiosRequestConfig) => {
    console.log(req);
    return req;
  });

  axios.interceptors.response.use((res: AxiosResponse) => {
    console.log(res);
    return res;
  });

  return (
    <AuthProvider>
      <Template>
        <Component {...pageProps} />
      </Template>
    </AuthProvider>
  );
}

export default MyApp;
