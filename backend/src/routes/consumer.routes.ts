import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import { ConsumerController } from "../controllers/consumer.controller";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { ConsumerService } from "../services/consumer.service";

const consumerRouter = Router();

const prisma = new PrismaClient();

const consumerRepository = new ConsumerRepository(prisma);
const consumerService = new ConsumerService(consumerRepository);
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
