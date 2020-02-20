import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientController from "./app/controllers/RecipientController";
import CepController from "./app/controllers/CepController";
import DeliverymanController from "./app/controllers/DeliverymanController";
import FileController from "./app/controllers/FileController";
import OrderController from "./app/controllers/OrderController";

import authMiddleware from "./app/middleware/auth";
import adminAuthMiddleware from "./app/middleware/adminAuth";

const routes = new Router();
const upload = multer(multerConfig);

routes.get("/cep", CepController.show);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.put("/users/:id", UserController.update);

routes.use(adminAuthMiddleware);

routes.get("/recipients", RecipientController.index);
routes.post("/recipients", RecipientController.store);
routes.put("/recipients", RecipientController.update);

routes.get("/deliverymans", DeliverymanController.index);
routes.get("/deliverymans/:id", DeliverymanController.show);
routes.post("/deliverymans", DeliverymanController.store);
routes.put("/deliverymans/:id", DeliverymanController.update);
routes.delete("/deliverymans/:id", DeliverymanController.delete);

routes.get("/orders", OrderController.index);
routes.get("/orders/:id", OrderController.show);
routes.post("/orders", OrderController.store);
routes.put("/orders/:id", OrderController.update);
routes.delete("/orders/:id", OrderController.delete);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
