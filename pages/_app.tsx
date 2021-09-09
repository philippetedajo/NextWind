import { Progress } from "../components";
import { AuthProvider } from "../context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const EmptyTemplate = ({ children }) => <>{children}</>;
  const Template = Component.Template || EmptyTemplate;
  Progress();

  return (
    <AuthProvider>
      <Template>
        <Component {...pageProps} />
      </Template>
    </AuthProvider>
  );
}

export default MyApp;
