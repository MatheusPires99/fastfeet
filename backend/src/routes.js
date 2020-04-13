import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import DeliverymanSessionController from "./app/controllers/DeliverymanSessionController";
import RecipientController from "./app/controllers/RecipientController";
import DeliverymanController from "./app/controllers/DeliverymanController";
import FileController from "./app/controllers/FileController";
import OrderController from "./app/controllers/OrderController";
import DeliveryController from "./app/controllers/DeliveryController";
import DeliveredOrderController from "./app/controllers/DeliveredOrderController";
import DeliveryProblemsController from "./app/controllers/DeliveryProblemsController";

import authMiddleware from "./app/middleware/auth";
import adminAuthMiddleware from "./app/middleware/adminAuth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.post("/deliverymans/sessions", DeliverymanSessionController.store);

routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.put("/users/:id", UserController.update);

routes.get("/deliverymans/:id/deliveries", DeliveryController.index);
routes.put(
  "/deliverymans/:deliveryman_id/deliveries/:order_id",
  DeliveryController.update
);

routes.get("/deliverymans/:id/delivered", DeliveredOrderController.index);

routes.use(adminAuthMiddleware);

routes.get("/recipients", RecipientController.index);
routes.get("/recipients/:id", RecipientController.show);
routes.post("/recipients", RecipientController.store);
routes.put("/recipients/:id", RecipientController.update);
routes.delete("/recipients/:id", RecipientController.delete);

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

routes.get("/delivery/problems", DeliveryProblemsController.index);
routes.get("/delivery/:id/problems", DeliveryProblemsController.show);
routes.post("/delivery/:id/problems", DeliveryProblemsController.store);
routes.delete(
  "/problem/:id/cancel-delivery",
  DeliveryProblemsController.delete
);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
