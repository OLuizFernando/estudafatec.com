import { createRouter } from "next-connect";
import controller from "infra/controller";
import activation from "models/activation";
import authorization from "models/authorization";

const router = createRouter();

router.use(controller.injectAnonymousOrAuthenticatedUser);

router.patch(controller.canRequest("read:activation_token"), patchHandler);

export default router.handler(controller.errorHandlers);

async function patchHandler(request, response) {
  const userTryingToPatch = request.context.user;
  const activationTokenId = request.query.token_id;

  const validActivationToken =
    await activation.findOneValidById(activationTokenId);

  await activation.activateUserById(validActivationToken.user_id);

  const usedActivationToken =
    await activation.markTokenAsUsed(activationTokenId);

  const secureOutputValues = authorization.filterOutput(
    userTryingToPatch,
    "read:activation_token",
    usedActivationToken,
  );

  response.status(200).json(secureOutputValues);
}
