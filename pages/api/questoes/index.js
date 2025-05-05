import { createRouter } from "next-connect";
import controller from "infra/controller";
import database from "infra/database";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const provasFound = await database.find({});
  response.status(200).json(provasFound);
}
