import { ConsumerRepository } from "../repositories/consumer/consumer.repository";

export class ConsumerService {
  constructor(private consumerRepository: ConsumerRepository) {}

  async createConsumerUnit(
    clientNumber: string,
    installationNumber: string,
    clientName: string
  ) {
    try {
      return this.consumerRepository.create({
        clientNumber,
        installationNumber,
        clientName,
      });
    } catch (error) {
      console.error("Erro ao criar o consumidor:", error);
      throw error;
    }
  }

  async getConsumerUnit(clientNumber: string) {
    try {
      return this.consumerRepository.findFirst({
        clientNumber,
      });
    } catch (error) {
      console.error("Erro ao obter o consumidor:", error);
      throw error;
    }
  }

  async getAllConsumerUnits() {
    try {
      return this.consumerRepository.findMany();
    } catch (error) {
      console.error("Erro ao obter todos os consumidores:", error);
      throw error;
    }
  }
}
