import { createRouter } from "next-connect";
import controller from "infra/controller";
import database from "infra/database";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
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

  const { ano, semestre, numero, disciplina } = request.query;

  const filtro = {};

  if (ano) filtro.ano = parseInt(ano, 10);
  if (semestre) filtro.semestre = parseInt(semestre, 10);
  if (numero) filtro.numero = parseInt(numero, 10);
  if (disciplina) filtro.disciplina = disciplinaMap[disciplina];

  const provasFound = await database.find(filtro);
  response.status(200).json(provasFound);
}
