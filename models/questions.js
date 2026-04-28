import mongo from "infra/mongo.js";
import { ValidationError } from "infra/errors";

async function filter(queryParams) {
  const allowedParams = ["year", "semester", "number", "subject"];
  const unknownParams = Object.keys(queryParams).filter(
    (param) => !allowedParams.includes(param),
  );

  if (unknownParams.length > 0) {
    throw new ValidationError({
      message: `Parâmetros inválidos detectados: ${unknownParams.join(", ")}.`,
      action: `Use apenas parâmetros permitidos: year, semester, number, subject.`,
    });
  }

  const subjectMap = {
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

  if (queryParams.year) filter.ano = parseInt(queryParams.year, 10);
  if (queryParams.semester)
    filter.semestre = parseInt(queryParams.semester, 10);
  if (queryParams.number) filter.numero = parseInt(queryParams.number, 10);
  if (queryParams.subject) filter.disciplina = subjectMap[queryParams.subject];

  return await mongo.query(filter);
}

const questions = {
  filter,
};

export default questions;
