import Link from "next/link";

function Footer() {
  const footerItems = [
    { id: 0, text: "Recursos", href: "/#recursos" },
    { id: 1, text: "Depoimentos", href: "/#depoimentos" },
    { id: 2, text: "Planos", href: "/#planos" },
    { id: 3, text: "Lista de Espera", href: "/waitlist" },
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-[#2e2e2e] to-[#1d1d1d] py-20 text-white flex flex-col items-center justify-center px-5">
        <Link href="/" className="text-4xl sm:text-6xl konsens mb-3">
          EstudaFatec.com
        </Link>
        <span className="text-lg sm:text-xl text-center">
          © 2025 EstudaFatec.com. Todos os direitos reservados.
        </span>
        <div className="w-1/2 sm:w-1/5 border-2 rounded-full border-[#922020] my-7"></div>
        <div className="flex flex-col sm:flex-row items-center">
          {footerItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-xl font-bold mb-3 sm:mb-0 sm:mx-4 hover:scale-110 transition-all duration-200 ease-in-out"
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Footer;
