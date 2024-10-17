/*
  Warnings:

  - A unique constraint covering the columns `[clientNumber,referenceMonth]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoice_clientNumber_referenceMonth_key" ON "Invoice"("clientNumber", "referenceMonth");
