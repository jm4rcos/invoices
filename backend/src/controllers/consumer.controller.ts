import { NextFunction, Request, Response } from "express";
import { ConsumerService } from "../services/consumer.service";

export class ConsumerController {
  constructor(private consumerService: ConsumerService) {}

  getAllConsumerUnits = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const consumerUnits = await this.consumerService.getAllConsumerUnits();
      res.json(consumerUnits);
    } catch (error) {
      next(error);
    }
  };

  getConsumerUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clientNumber } = req.params;
      const consumerUnit = await this.consumerService.getConsumerUnit(
        clientNumber
      );
      res.json(consumerUnit);
    } catch (error) {
      next(error);
    }
  };
}
