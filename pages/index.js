import Image from "next/image";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300 pb-10 md:pb-0">
        <Navbar />
        <HeroSection />
      </div>
      <FeaturesSection />
      <FeedbacksSection />
      <PlansSection />
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center max-w-screen-xl mx-20 md:p-5 mt-10 md:mt-0">
        <div className="flex flex-col w-auto md:w-fit mb-15 md:mb-0 text-[#2e2e2e] me-0 md:me-10 lg:me-25">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-start mb-5">
            A Plataforma de Estudos Focada no Vestibular Fatec
          </h1>
          <p className="text-2xl xl:text-3xl text-neutral-600 mb-8">
            Saia na frente com nossos recursos e materiais pensados para você!
          </p>
          <a
            href="#planos"
            className="text-white shadow-2xl bg-[#922020] hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-2xl md:text-3xl rounded-lg py-3 text-center w-xs transition-all duration-200 ease-in-out hover:scale-103"
          >
            Comece a estudar
          </a>
        </div>
        <div className="flex flex-row md:flex-col w-auto max-w-md md:w-fit">
          <Image
            width="1000"
            height="1000"
            quality="100"
            src="/home/student.png"
            alt="Estudante"
            priority
          />
        </div>
      </div>
    </>
  );
}

function FeaturesSection() {
  const itemsData = [
    {
      id: 0,
      iconSrc: "/icons/questoes.png",
      title: "Banco de Questões",
      text: "Acesse uma ampla coleção de questões.",
    },
    {
      id: 1,
      iconSrc: "/icons/estatistica.png",
      title: "Estatísticas do Aluno",
      text: "Acompanhe seu progresso e desempenho.",
    },
    {
      id: 2,
      iconSrc: "/icons/plano.png",
      title: "Planos de Estudo",
      text: "Organize sua rotina de estudos de forma eficaz.",
    },
  ];

  return (
    <>
      <div
        id="recursos"
        className="flex justify-center bg-gradient-to-br from-[#7e1a1a] to-[#a72929] w-full text-white"
      >
        <div className="flex flex-col items-center max-w-screen-xl md:mx-20 py-15 md:py-25 md:pt-auto">
          <h2 className="text-4xl md:text-5xl md:w-3xl font-bold text-center mb-15 md:mb-20">
            Estes recursos vão facilitar a sua vida de vestibulando!
          </h2>
          <div className="flex flex-col md:flex-row text-center px-7 md:px-10 mb-5 md:mb-20">
            {itemsData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col h-full justify-center items-center md:px-7 mb-10 md:mb-auto mx-3 flex-1 rounded-2xl shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] bg-black/10 px-7 py-9 hover:scale-103 transition-all duration-200 ease-in-out"
              >
                <Image
                  width="95"
                  height="95"
                  className="mb-5"
                  src={item.iconSrc}
                  alt={`ícone ${item.title}`}
                />
                <h3 className="text-3xl font-semibold mb-4">{item.title}</h3>
                <p className="text-xl">{item.text}</p>
              </div>
            ))}
          </div>
          <a
            href="#planos"
            className="text-[#922020] shadow-2xl bg-white hover:bg-neutral-200 focus:ring-4 focus:outline-none focus:ring-white/50 font-medium text-2xl md:text-3xl rounded-lg py-3 text-center w-xs transition-all duration-200 ease-in-out hover:scale-103"
          >
            Vou ser aprovado!
          </a>
        </div>
      </div>
    </>
  );
}

function FeedbacksSection() {
  const itemsData = [
    {
      id: 0,
      profileSrc: "/profiles/ana-catarina.png",
      name: "Ana Catarina",
      degree: "Análise e Desenvolvimento de Sistemas",
      feedback:
        "Estudei bastante pelo banco de questões da plataforma e consegui ser aprovada!",
    },
    {
      id: 1,
      profileSrc: "/profiles/marcelo-vinicius.png",
      name: "Marcelo Vinicius",
      degree: "Marketing",
      feedback:
        "O plano de estudos me ajudou demais a manter o foco nos meses antes da prova. Valeu muito a pena!",
    },
    {
      id: 2,
      profileSrc: "/profiles/luiz-fernando.png",
      name: "Luiz Fernando",
      degree: "Análise e Desenvolvimento de Sistemas",
      feedback:
        "Com as estatísticas, eu conseguia ver meus pontos fracos e sabia no que focar. Foi o que mais me ajudou.",
    },
  ];

  return (
    <>
      <div
        id="depoimentos"
        className="flex justify-center bg-gradient-to-br from-[#3d3d3d] to-[#2e2e2e] w-full text-white"
      >
        <div className="flex flex-col items-center max-w-screen-xl mx-5 pt-15 pb-10 md:pt-25 md:pb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-15 lg:mb-20">
            Depoimentos dos aprovados
          </h2>
          <div className="flex flex-col lg:flex-row text-center mb-5 lg:mb-15">
            {itemsData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col h-full justify-between lg:px-7 mb-10 lg:mb-auto mx-3 flex-1 rounded-2xl shadow-2xl bg-white text-[#2e2e2e] px-7 py-5 hover:scale-103 transition-all duration-200 ease-in-out"
              >
                <Image
                  src="/icons/aspas.png"
                  width="64"
                  height="64"
                  alt="ícone aspas"
                />
                <p className="text-2xl my-5 h-full flex items-center">
                  {item.feedback}
                </p>
                <div className="flex items-center p-5 rounded-2xl bg-neutral-300 shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)]">
                  <Image
                    width="95"
                    height="95"
                    quality="100"
                    className="me-5 lg:me-7 rounded-full"
                    src={item.profileSrc}
                    alt={`Foto de ${item.name}`}
                  />
                  <div className="flex flex-col text-start">
                    <p className="text-xl font-bold mb-1">{item.name}</p>
                    <p className="text-neutral-600">{item.degree}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white text-2xl lg:text-3xl text-center mb-10">
            Faça como eles e conquiste sua vaga na Fatec!
            <br />
            Quem estuda passa.
          </p>
          <Image
            width="32"
            height="32"
            src="/icons/seta-baixo.png"
            alt="ícone seta"
          />
        </div>
      </div>
    </>
  );
}

function PlansSection() {
  const plans = [
    {
      id: 0,
      name: "Base",
      price: "0",
      priceColor: "text-[#2e2e2e]",
      button: {
        text: "Experimente",
        style:
          "text-[#2e2e2e] bg-white hover:bg-neutral-200 border-2 border-neutral-200 focus:ring-neutral-100",
        href: "/waitlist",
      },
      features: [
        { id: 0, text: "10 Questões por dia", icon: "/icons/check.png" },
        { id: 1, text: "Estatísticas do aluno", icon: "/icons/x.png" },
        { id: 2, text: "Plano de estudo", icon: "/icons/x.png" },
      ],
    },
    {
      id: 1,
      name: "Aprovação",
      price: "20",
      priceColor: "text-[#922020]",
      button: {
        text: "Seja aprovado",
        style:
          "text-white bg-[#922020] hover:bg-red-900 shadow-lg focus:ring-red-300",
        href: "/waitlist",
      },
      features: [
        { id: 0, text: "Questões ilimitadas", icon: "/icons/check.png" },
        { id: 1, text: "Estatísticas do aluno", icon: "/icons/check.png" },
        { id: 2, text: "Plano de estudo", icon: "/icons/check.png" },
      ],
    },
  ];

  return (
    <div
      id="planos"
      className="flex justify-center bg-gradient-to-br from-white to-neutral-300 w-full text-[#2e2e2e]"
    >
      <div className="flex flex-col items-center max-w-screen-xl md:mx-20 px-5 py-15 md:py-25 md:pt-auto md:w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Planos
        </h2>
        <p className="text-2xl md:text-3xl text-center mb-15 md:mb-20 text-neutral-600">
          Seu caminho até a aprovação começa aqui!
        </p>
        <div className="flex flex-col md:flex-row text-center w-full md:w-2xl lg:w-3xl">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col h-full justify-center items-center md:px-7 mb-10 md:mb-auto mx-3 flex-1 rounded-2xl shadow-lg bg-white p-9"
            >
              <h3 className="text-3xl md:text-4xl font-bold">{plan.name}</h3>
              <h4
                className={`text-2xl md:text-3xl font-semibold my-10 ${plan.priceColor}`}
              >
                R$
                <span className="text-6xl md:text-7xl font-bold mx-0.5">
                  {plan.price}
                </span>
                /mês
              </h4>
              <div className="flex flex-col">
                <ul className="text-xl md:text-2xl text-neutral-600 text-start mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-center mb-3">
                      <Image
                        width="95"
                        height="95"
                        className="size-7 me-3"
                        src={feature.icon}
                        alt={feature.text}
                      />
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.button.href}
                  className={`${plan.button.style} focus:ring-4 focus:outline-none font-medium text-xl md:text-2xl rounded-lg py-3 text-center hover:scale-105 transition-all duration-200 ease-in-out`}
                >
                  {plan.button.text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
