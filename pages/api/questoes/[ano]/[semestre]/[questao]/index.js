import { createRouter } from "next-connect";
import controller from "infra/controller";
import database from "infra/database";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const ano = parseInt(request.query.ano, 10);
  const semestre = parseInt(request.query.semestre, 10);
  const questao = parseInt(request.query.questao, 10);

  const questoesFound = await database.find({
    ano: ano,
    semestre: semestre,
    numero: questao,
  });
  response.status(200).json(questoesFound);
}
