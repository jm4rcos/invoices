import { ConsumerUnit, PrismaClient } from "@prisma/client";
import { CreateConsumer } from "../../dtos/consumer.dto";

export class ConsumerRepository {
  constructor(private prisma: PrismaClient) {}

  async findFirst(where: {
    id?: string;
    clientNumber?: string;
    installationNumber?: string;
  }): Promise<ConsumerUnit | null> {
    return this.prisma.consumerUnit.findFirst({ where });
  }

  async findMany(where?: Partial<ConsumerUnit>): Promise<ConsumerUnit[]> {
    return this.prisma.consumerUnit.findMany({
      where,
      include: { invoices: true },
    });
  }

  async create(data: CreateConsumer): Promise<ConsumerUnit> {
    return this.prisma.consumerUnit.create({ data });
  }
}
