import { createRouter } from "next-connect";
import controller from "infra/controller";
import authenticator from "models/authenticator";
import session from "models/session";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authenticator.getAuthenticatedUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  const cookie = session.setCookie(newSession.token);
  response.setHeader("Set-Cookie", cookie);

  return response.status(201).json(newSession);
}
