import Image from "next/image";

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
            src="/home/student.png"
            alt="Estudante"
            priority
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
