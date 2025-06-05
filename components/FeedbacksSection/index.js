import Image from "next/image";

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

export default FeedbacksSection;
