/*
  Warnings:

  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `compensatedEnergy` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `energyConsumption` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `ucId` on the `Invoice` table. All the data in the column will be lost.
  - The `id` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UC` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClientToUC` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `compensatedEnergyGDIKwh` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compensatedEnergyGDIValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumerUnitId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricityKwh` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricityValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sceeEnergyKwh` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sceeEnergyValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `referenceMonth` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_ucId_fkey";

-- DropForeignKey
ALTER TABLE "_ClientToUC" DROP CONSTRAINT "_ClientToUC_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientToUC" DROP CONSTRAINT "_ClientToUC_B_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
DROP COLUMN "clientId",
DROP COLUMN "clientName",
DROP COLUMN "compensatedEnergy",
DROP COLUMN "energyConsumption",
DROP COLUMN "ucId",
ADD COLUMN     "compensatedEnergyGDIKwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "compensatedEnergyGDIValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "consumerUnitId" INTEGER NOT NULL,
ADD COLUMN     "electricityKwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricityValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sceeEnergyKwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sceeEnergyValue" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "referenceMonth",
ADD COLUMN     "referenceMonth" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "UC";

-- DropTable
DROP TABLE "_ClientToUC";

-- CreateTable
CREATE TABLE "ConsumerUnit" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "installationNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsumerUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerUnit_clientNumber_key" ON "ConsumerUnit"("clientNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerUnit_installationNumber_key" ON "ConsumerUnit"("installationNumber");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_consumerUnitId_fkey" FOREIGN KEY ("consumerUnitId") REFERENCES "ConsumerUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
