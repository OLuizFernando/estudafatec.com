import Head from "next/head";
import "styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          EstudaFatec.com - A plataforma de estudos focada no Vestibular Fatec
        </title>
        <meta
          name="description"
          content="A melhor plataforma para estudar para o Vestibular Fatec. Questões organizadas por disciplina, ano e semestre para facilitar sua preparação para o vestibular."
        />
        <meta
          name="keywords"
          content="Fatec, vestibular Fatec, questões Fatec, provas Fatec, estudar Fatec, EstudaFatec, simulado Fatec, provas anteriores Fatec"
        />
        <meta name="theme-color" content="#2e2e2e" />

        <link rel="canonical" href="https://www.estudafatec.com" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="EstudaFatec.com - A plataforma de estudos focada no Vestibular Fatec"
        />
        <meta
          property="og:description"
          content="A melhor forma de estudar para o Vestibular Fatec. Pratique com provas anteriores e questões organizadas."
        />
        <meta property="og:url" content="https://www.estudafatec.com" />
        <meta property="og:site_name" content="EstudaFatec.com" />
        <meta
          property="og:image"
          content="https://www.estudafatec.com/metadata/student.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Banner do EstudaFatec" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EstudaFatec.com - A plataforma de estudos focada no Vestibular Fatec"
        />
        <meta
          name="twitter:description"
          content="A melhor forma de estudar para o Vestibular Fatec. Pratique com provas anteriores e questões organizadas."
        />
        <meta
          name="twitter:image"
          content="https://www.estudafatec.com/metadata/student.png"
        />

        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
