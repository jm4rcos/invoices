import { ConsumerUnit, PrismaClient } from "@prisma/client";
import { CreateConsumer } from "../../dtos/consumer.dto";

const prisma = new PrismaClient();

type ConsumerUnitWhereUniqueInput = {
  id?: string;
  clientNumber?: string;
  installationNumber?: string;
};

export class ConsumerRepository {
  async findFirst(
    where: ConsumerUnitWhereUniqueInput
  ): Promise<ConsumerUnit | null> {
    return prisma.consumerUnit.findFirst({ where });
  }

  async findMany(where?: Partial<ConsumerUnit>): Promise<ConsumerUnit[]> {
    return prisma.consumerUnit.findMany({ where });
  }

  async create(data: CreateConsumer): Promise<ConsumerUnit> {
    return prisma.consumerUnit.create({ data });
  }

  async update(
    where: {
      id: string;
      clientNumber?: string;
    },
    data: Partial<ConsumerUnit>
  ): Promise<ConsumerUnit | null> {
    return prisma.consumerUnit.update({ where, data });
  }
}
