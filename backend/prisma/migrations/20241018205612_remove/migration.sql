/*
  Warnings:

  - Made the column `clientName` on table `ConsumerUnit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Invoice_consumerUnitId_referenceMonth_key";

-- AlterTable
ALTER TABLE "ConsumerUnit" ALTER COLUMN "clientName" SET NOT NULL;
