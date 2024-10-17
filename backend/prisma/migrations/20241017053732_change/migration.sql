/*
  Warnings:

  - You are about to drop the column `energySceeeWithoutIcms` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `gdSavings` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `publicLightingContribution` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `totalValueWithoutGd` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `totalValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "energySceeeWithoutIcms",
DROP COLUMN "gdSavings",
DROP COLUMN "publicLightingContribution",
DROP COLUMN "totalValueWithoutGd",
ADD COLUMN     "totalValue" DOUBLE PRECISION NOT NULL;
