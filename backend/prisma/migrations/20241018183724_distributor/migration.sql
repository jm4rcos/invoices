/*
  Warnings:

  - Added the required column `distributor` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "distributor" TEXT NOT NULL;
