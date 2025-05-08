import mongo from "infra/mongo.js";

async function filter({ ano, semestre, numero, disciplina }) {
  const disciplinaMap = {
    biologia: "Biologia",
    fisica: "Física",
    geografia: "Geografia",
    historia: "História",
    ingles: "Inglês",
    matematica: "Matemática",
    multidisciplinar: "Multidisciplinar",
    portugues: "Português",
    quimica: "Química",
    "raciocinio-logico": "Raciocínio Lógico",
  };

  const filter = {};

  if (ano) filter.ano = parseInt(ano, 10);
  if (semestre) filter.semestre = parseInt(semestre, 10);
  if (numero) filter.numero = parseInt(numero, 10);
  if (disciplina) filter.disciplina = disciplinaMap[disciplina];

  return await mongo.query(filter);
}

const questions = {
  filter,
};

export default questions;
