-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "referenceMonth" TIMESTAMP(3) NOT NULL,
    "energyConsumption" DOUBLE PRECISION NOT NULL,
    "energySceeeWithoutIcms" DOUBLE PRECISION NOT NULL,
    "compensatedEnergy" DOUBLE PRECISION NOT NULL,
    "publicLightingContribution" DOUBLE PRECISION NOT NULL,
    "totalValueWithoutGd" DOUBLE PRECISION NOT NULL,
    "gdSavings" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
