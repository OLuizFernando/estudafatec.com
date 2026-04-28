import { createRouter } from "next-connect";
import controller from "infra/controller";
import questions from "models/questions";

export default createRouter().get(getHandler).handler(controller.errorHandlers);

async function getHandler(request, response) {
  const examsFound = await questions.filter(request.query);
  response.status(200).json(examsFound);
}
