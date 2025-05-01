function FeaturesSection() {
  const itemsData = [
    {
      id: 0,
      iconSrc: "icons/lineal-questoes.png",
      title: "Banco de Questões",
      text: "Mais de 1.000 questões de vestibulares da Fatec, com resolução e comentários.",
    },
    {
      id: 1,
      iconSrc: "icons/lineal-estatistica.png",
      title: "Estatísticas",
      text: "Acompanhamento de desempenho e evolução do aluno, com gráficos e relatórios.",
    },
    {
      id: 2,
      iconSrc: "icons/lineal-plano.png",
      title: "Plano de Estudo",
      text: "Criação de um plano de estudo personalizado, com metas e prazos.",
    },
  ];

  return (
    <>
      <div className="flex justify-center bg-gradient-to-bl from-[#922020] to-red-800 w-full text-white">
        <div className="flex flex-col items-center max-w-screen-xl md:mx-20 px-5 pt-15 md:py-25 md:pt-auto">
          <h2 className="text-4xl md:text-5xl md:w-3xl font-bold text-center mb-15 md:mb-25">
            Estes recursos vão facilitar a sua vida de vestibulando!
          </h2>
          <div className="flex flex-col md:flex-row text-center px-7 md:px-10">
            {itemsData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-center items-center md:px-7 mb-15 md:mb-auto flex-1"
              >
                <img width="95" className="mb-3" src={item.iconSrc} />
                <h3 className="text-3xl font-semibold mb-4">{item.title}</h3>
                <p className="text-xl">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturesSection;
