/*
  Warnings:

  - A unique constraint covering the columns `[consumerUnitId,referenceMonth]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoice_consumerUnitId_referenceMonth_key" ON "Invoice"("consumerUnitId", "referenceMonth");
