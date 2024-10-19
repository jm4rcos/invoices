import { ConsumerRepository } from "../repositories/consumer/consumer.repository";

const consumerRepository = new ConsumerRepository();

export class ConsumerService {
  async createConsumerUnit(
    clientNumber: string,
    installationNumber: string,
    clientName: string
  ) {
    try {
      return consumerRepository.create({
        clientNumber,
        installationNumber,
        clientName,
      });
    } catch (error) {
      console.error("Error creating consumer unit:", error);
      throw error;
    }
  }

  async getConsumerUnit(clientNumber: string) {
    try {
      return consumerRepository.findFirst({
        clientNumber,
      });
    } catch (error) {
      console.error("Error getting consumer unit:", error);
      throw error;
    }
  }

  async getAllConsumerUnits() {
    try {
      return consumerRepository.findMany();
    } catch (error) {
      console.error("Error getting all consumer units:", error);
      throw error;
    }
  }
}
