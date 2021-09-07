import Head from "next/head";
import PageTemplate from "../templates/page.template";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { useRouter } from "next/router";

const Home = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div>
      <Head>
        <title>Nextwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <p className="mt-14 text-2xl md:text-4xl text-center w-2/3">Nextwind</p>
      </div>
    </div>
  );
};

export default Home;

Home.Template = PageTemplate;
