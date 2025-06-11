import { useState } from "react";
import AppNavbar from "components/AppNavbar";
import Link from "next/link";

function Filtro() {
  const [disciplina, setDisciplina] = useState("");
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");

  const buildUrl = () => {
    const params = new URLSearchParams();

    if (disciplina) params.append("disciplina", disciplina);
    if (ano) params.append("ano", ano);
    if (semestre) params.append("semestre", semestre);

    const queryString = params.toString();
    return `/app/questoes${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AppNavbar />
        <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300">
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-2xl py-15 px-10 md:p-15 m-5 max-w-md">
            <h1 className="text-4xl text-center font-bold mb-10 text-[#2e2e2e]">
              Filtrar Questões
            </h1>
            <form className="flex flex-col w-full">
              <div className="mb-5">
                <label
                  htmlFor="disciplina-select"
                  className="block mb-1 ps-1 text-lg font-medium text-[#2e2e2e]"
                >
                  Disciplina
                </label>
                <select
                  id="disciplina-select"
                  value={disciplina}
                  onChange={(e) => setDisciplina(e.target.value)}
                  className="border shadow-md border-gray-300 text-[#2e2e2e] rounded-lg focus:ring-2 focus:ring-[#922020]/25 focus:border-[#922020]/25 w-full p-3"
                >
                  <option value="">Todas Disciplinas</option>
                  <option value="biologia">Biologia</option>
                  <option value="fisica">Física</option>
                  <option value="geografia">Geografia</option>
                  <option value="historia">História</option>
                  <option value="ingles">Inglês</option>
                  <option value="matematica">Matemática</option>
                  <option value="multidisciplinar">Multidisciplinar</option>
                  <option value="portugues">Português</option>
                  <option value="quimica">Química</option>
                  <option value="raciocinio-logico">Raciocínio Lógico</option>
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="ano-select"
                  className="block mb-1 ps-1 text-lg font-medium text-[#2e2e2e]"
                >
                  Ano
                </label>
                <select
                  id="ano-select"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  className="border shadow-md border-gray-300 text-[#2e2e2e] rounded-lg focus:ring-2 focus:ring-[#922020]/25 focus:border-[#922020]/25 w-full p-3"
                >
                  <option value="">Todos Anos</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="semestre-select"
                  className="block mb-1 ps-1 text-lg font-medium text-[#2e2e2e]"
                >
                  Semestre
                </label>
                <select
                  id="semestre-select"
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                  className="border shadow-md border-gray-300 text-[#2e2e2e] rounded-lg focus:ring-2 focus:ring-[#922020]/25 focus:border-[#922020]/25 w-full p-3"
                >
                  <option value="">Todos Semestres</option>
                  <option value="1">1º</option>
                  <option value="2">2º</option>
                </select>
              </div>
              <Link
                href={buildUrl()}
                className="text-white shadow-2xl bg-[#922020] hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 text-xl rounded-lg p-3 text-center w-full mt-5"
              >
                Filtrar Questões
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtro;
