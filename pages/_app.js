import Head from "next/head";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          EstudaFatec.com - A plataforma de estudos focada no Vestibular Fatec
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
