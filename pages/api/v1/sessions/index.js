import { createRouter } from "next-connect";
import controller from "infra/controller";
import authentication from "models/authentication.js";
import session from "models/session.js";

const router = createRouter(controller.errorHandler);

router.post(postHandler);
router.delete(deleteHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authentication.getAuthenticateUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  controller.setSessionCookie(newSession.token, response);

  return response.status(201).json(newSession);
}

async function deleteHandler(request, response) {
  const sessionToken = request.cookies.session_id;

  const sessionObject = await session.findOneValidByToken(sessionToken);
  const expiredSession = await session.expiredById(sessionObject.id);

  controller.clearSessionCookie(response);

  return response.status(200).json(expiredSession);
}
