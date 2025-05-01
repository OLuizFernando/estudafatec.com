import { usePathname } from "next/navigation";

function Navbar() {
  const navItems = [
    { id: 0, text: "Recursos", href: "/" },
    { id: 1, text: "Planos", href: "/#planos" },
    { id: 2, text: "Sobre", href: "/#sobre" },
    { id: 3, text: "Contato", href: "#contato" },
  ];

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-[#2e2e2e] bg-opacity-5 fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl md:text-3xl whitespace-nowrap text-white konsens font-semibold">
              EstudaFatec.com
            </span>
          </a>
          <div className="flex">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-md md:hidden hover:ring hover:ring-neutral-700 focus:border focus:border-neutral-700"
              aria-controls="navbar-sticky"
              aria-expanded="false"
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
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col text-lg p-4 md:p-0 mt-4 font-medium border border-neutral-700 rounded-lg bg-[#2e2e2e] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`
                      block py-2 px-3 rounded-md md:py-2 md:px-4 text-white
                      ${pathname === item.href ? "bg-neutral-800" : "hover:bg-neutral-800"}
                    `}
                    aria-current="page"
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

      <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
    </>
  );
}

export default Navbar;
