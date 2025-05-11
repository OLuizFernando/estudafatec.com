import Image from "next/image";

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
        href: "/register",
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
        href: "/payment",
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
                  className={`${plan.button.style} focus:ring-4 focus:outline-none font-medium text-xl md:text-2xl rounded-lg py-3 text-center`}
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

export default PlansSection;
