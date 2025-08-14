import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user.js";

const router = createRouter(controller.errorHandler);

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  //procurar email no banco

  //a busca precisa levar em consideração letra maiuscula e minuscula

  //só deixar passar caso o n exista o email

  const newUser = await user.create(userInputValues);
  return response.status(201).json(newUser);
}
