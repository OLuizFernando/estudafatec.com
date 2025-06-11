import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      id: 0,
      text: "Questões",
      href: "/app/questoes/filtro",
      relatedRoute: "/app/questoes",
    },
    { id: 1, text: "Planos de Estudo", href: "" },
    { id: 2, text: "Minhas Estatísticas", href: "" },
  ];

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[#2e2e2e] bg-opacity-5 fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl sm:text-3xl whitespace-nowrap text-white konsens font-semibold">
              EstudaFatec.com
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-md lg:hidden hover:ring hover:ring-neutral-700 focus:border focus:border-neutral-700 transition-all duration-200 ease-in-out"
              aria-controls="navbar-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-menu"
          >
            <ul className="flex flex-col text-lg p-4 lg:p-0 mt-4 font-medium border border-neutral-700 rounded-lg bg-[#2e2e2e] lg:space-x-8 lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      block py-2 px-3 rounded-md lg:py-2 lg:px-4 my-1 lg:my-0 text-white
                      ${
                        pathname.startsWith(item.relatedRoute)
                          ? "shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] bg-black/10"
                          : "hover:shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] hover:bg-black/10 transition-all duration-200 ease-in-out"
                      }
                    `}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
}

export default AppNavbar;
