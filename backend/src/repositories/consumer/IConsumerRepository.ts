import { ConsumerUnit } from "@prisma/client";
import { CreateConsumer } from "../../dtos/consumer.dto";

export interface IConsumerRepository {
  finFirst(where: {
    id?: string;
    clientNumber: string;
    installationNumber: string;
  }): Promise<ConsumerUnit | null>;
  findMany(where?: Partial<ConsumerUnit>): Promise<ConsumerUnit[]>;
  create(data: CreateConsumer): Promise<ConsumerUnit>;
  update(
    where: {
      id: string;
      clientNumber?: string;
    },
    data: Partial<ConsumerUnit>
  ): Promise<ConsumerUnit | null>;
}
