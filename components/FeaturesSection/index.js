import Image from "next/image";

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
      text: "Acompanhseu progresso e desempenho.",
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
        <div className="flex flex-col items-center max-w-screen-xl md:mx-20 px-5 py-15 md:py-25 md:pt-auto">
          <h2 className="text-4xl md:text-5xl md:w-3xl font-bold text-center mb-15 md:mb-20">
            Estes recursos vão facilitar a sua vida de vestibulando!
          </h2>
          <div className="flex flex-col md:flex-row text-center px-7 md:px-10 mb-5 md:mb-20">
            {itemsData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col h-full justify-center items-center md:px-7 mb-10 md:mb-auto mx-3 flex-1 rounded-2xl shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] bg-black/10 px-7 py-9"
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
            className="text-[#922020] shadow-2xl bg-white hover:bg-neutral-200 focus:ring-4 focus:outline-none focus:ring-white/50 font-medium text-2xl md:text-3xl rounded-lg py-3 text-center w-xs"
          >
            Vou ser aprovado!
          </a>
        </div>
      </div>
    </>
  );
}

export default FeaturesSection;
