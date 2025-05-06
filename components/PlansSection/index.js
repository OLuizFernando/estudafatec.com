function PlansSection() {
  return (
    <>
      <div
        id="planos"
        className="flex justify-center bg-gradient-to-br from-white to-neutral-300 w-full text-[#2e2e2e]"
      >
        <div className="flex flex-col items-center max-w-screen-xl md:mx-20 px-5 py-15 md:py-25 md:pt-auto">
          <h2 className="text-4xl md:text-5xl md:w-3xl font-bold text-center mb-4">
            Planos
          </h2>
          <p className="text-2xl md:text-3xl text-center mb-15 md:mb-20 text-neutral-600">
            Seu caminho até a aprovação começa aqui!
          </p>
          <div className="flex flex-col md:flex-row text-center w-full">
            {/* BASE */}
            <div className="flex flex-col h-full justify-center items-center md:px-7 mb-10 md:mb-auto mx-3 flex-1 rounded-2xl shadow-lg bg-white p-9">
              <h3 className="text-3xl md:text-4xl font-bold">Base</h3>
              <h4 className="text-2xl md:text-3xl font-semibold my-10">
                R$
                <span className="text-6xl md:text-7xl font-bold mx-0.5">0</span>
                /mês
              </h4>
              <div className="flex flex-col">
                <ul className="text-xl md:text-2xl text-neutral-600 text-start mb-7">
                  <li className="flex items-center mb-3">
                    <img className="size-7 me-3" src="/icons/check.png" />
                    10 Questões por dia
                  </li>
                  <li className="flex items-center mb-3">
                    <img className="size-7 me-3" src="/icons/x.png" />
                    Estatísticas do aluno
                  </li>
                  <li className="flex items-center">
                    <img className="size-7 me-3" src="/icons/x.png" />
                    Plano de estudo
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-[#2e2e2e] bg-white hover:bg-neutral-200 border-2 border-neutral-200 focus:ring-4 focus:outline-none focus:ring-neutral-100 font-medium text-xl md:text-2xl rounded-lg py-3 text-center"
                >
                  Experimente
                </a>
              </div>
            </div>

            {/* APROVAÇÃO */}
            <div className="flex flex-col h-full justify-center items-center md:px-7 mb-10 md:mb-auto mx-3 flex-1 rounded-2xl shadow-lg bg-white p-9">
              <h3 className="text-3xl md:text-4xl font-bold">Aprovação</h3>
              <h4 className="text-2xl md:text-3xl font-semibold my-10 text-[#922020]">
                R$
                <span className="text-6xl md:text-7xl font-bold mx-0.5">
                  20
                </span>
                /mês
              </h4>
              <div className="flex flex-col">
                <ul className="text-xl md:text-2xl text-neutral-600 text-start mb-7">
                  <li className="flex items-center mb-3">
                    <img className="size-7 me-3" src="/icons/check.png" />
                    Questões ilimitadas
                  </li>
                  <li className="flex items-center mb-3">
                    <img className="size-7 me-3" src="/icons/check.png" />
                    Estatísticas do aluno
                  </li>
                  <li className="flex items-center">
                    <img className="size-7 me-3" src="/icons/check.png" />
                    Plano de estudo
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-white bg-[#922020] hover:bg-red-900 shadow-lg focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-xl md:text-2xl rounded-lg py-3 text-center"
                >
                  Seja aprovado
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlansSection;
