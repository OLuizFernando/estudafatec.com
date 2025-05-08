import { createRouter } from "next-connect";
import controller from "infra/controller";
import questions from "models/questions";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const provasFound = await questions.filter(request.query);
  response.status(200).json(provasFound);
}
