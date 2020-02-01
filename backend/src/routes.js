import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientController from "./app/controllers/RecipientController";
import CepController from "./app/controllers/CepController";

import authMiddleware from "./app/middleware/auth";

const routes = new Router();

routes.get("/cep", CepController.show);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);
routes.post("/recipients", RecipientController.store);
routes.put("/recipients", RecipientController.update);

export default routes;
