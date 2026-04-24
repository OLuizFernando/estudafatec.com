import { createRouter } from "next-connect";
import controller from "infra/controller";
import waitlist from "models/waitlist";

export default createRouter()
  .post(postHandler)
  .handler(controller.errorHandlers);

async function postHandler(request, response) {
  const waitlistUserInputValues = request.body;
  const newWaitlistUser = await waitlist.register(waitlistUserInputValues);
  return response.status(201).json(newWaitlistUser);
}
