import { Router } from "express";

import { ConsumerController } from "../controllers/consumer.controller";
import { ConsumerService } from "../services/consumer.service";

const consumerRouter = Router();
const consumerService = new ConsumerService();
const consumerController = new ConsumerController(consumerService);

consumerRouter.get(
  "/",
  consumerController.getAllConsumerUnits.bind(consumerController)
);
consumerRouter.get(
  "/:clientNumber",
  consumerController.getConsumerUnit.bind(consumerController)
);

export default consumerRouter;
