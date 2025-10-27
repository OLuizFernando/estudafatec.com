import { createRouter } from "next-connect";
import controller from "infra/controller";
import activation from "models/activation";

const router = createRouter();

router.patch(patchHandler);

export default router.handler(controller.errorHandlers);

async function patchHandler(request, response) {
  const activationTokenId = request.query.token_id;

  const validActivationToken =
    await activation.findOneValidById(activationTokenId);

  const usedActivationToken =
    await activation.markTokenAsUsed(activationTokenId);

  await activation.activateUserById(validActivationToken.user_id);

  response.status(200).json(usedActivationToken);
}
