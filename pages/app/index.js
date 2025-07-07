import AppNavbar from "components/AppNavbar";
import Image from "next/image";

function App() {
  const itemsData = [
    {
      href: "/app/questoes/filtro",
      title: "Praticar",
      text: "Pratique com questões anteriores de provas da Fatec",
      iconSrc: "/icons/praticar.png",
    },
    {
      href: "",
      title: "Acompanhar",
      text: "Veja como você tem se saído nas questões",
      iconSrc: "/icons/acompanhar.png",
    },
    {
      href: "",
      title: "Planejar",
      text: "Monte planos de estudos personalizados",
      iconSrc: "/icons/planejar.png",
    },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300 pb-10 md:pb-0">
        <AppNavbar />
        <h1 className="font-bold text-center text-4xl md:text-5xl text-[#2e2e2e] mt-10 md:mt-0 mb-8 md:mb-15">
          E aí! Vamos Estudar?
        </h1>
        <div className="flex flex-col md:flex-row gap-7 max-w-screen-xl mx-5 lg:mx-10">
          {itemsData.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center text-center px-10 py-10 lg:px-15 lg:py-10 flex-1 rounded-2xl shadow-xl bg-white hover:scale-103 hover:cursor-pointer transition-all duration-200 ease-in-out"
            >
              <Image
                width="75"
                height="75"
                className="mb-5"
                src={item.iconSrc}
                alt={`ícone ${item.title}`}
              />
              <h2 className="font-semibold text-3xl text-[#2e2e2e] mb-3">
                {item.title}
              </h2>
              <p className="text-xl text-[#2e2e2e]">{item.text}</p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
