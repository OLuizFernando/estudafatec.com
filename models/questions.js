import mongo from "infra/mongo.js";
import { ValidationError } from "infra/errors";

async function filter(queryParams) {
  const allowedParams = ["ano", "semestre", "numero", "disciplina"];
  const unknownParams = Object.keys(queryParams).filter(
    (param) => !allowedParams.includes(param),
  );

  if (unknownParams.length > 0) {
    throw new ValidationError({
      message: `Parâmetros inválidos detectados: ${unknownParams.join(", ")}.`,
      action: `Use apenas parâmetros permitidos: ano, semestre, numero, disciplina.`,
    });
  }

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

  if (queryParams.ano) filter.ano = parseInt(queryParams.ano, 10);
  if (queryParams.semestre)
    filter.semestre = parseInt(queryParams.semestre, 10);
  if (queryParams.numero) filter.numero = parseInt(queryParams.numero, 10);
  if (queryParams.disciplina)
    filter.disciplina = disciplinaMap[queryParams.disciplina];

  return await mongo.query(filter);
}

const questions = {
  filter,
};

export default questions;
