/*
  Warnings:

  - The primary key for the `ConsumerUnit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_consumerUnitId_fkey";

-- AlterTable
ALTER TABLE "ConsumerUnit" DROP CONSTRAINT "ConsumerUnit_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ConsumerUnit_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ConsumerUnit_id_seq";

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
ALTER COLUMN "consumerUnitId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Invoice_id_seq";

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_consumerUnitId_fkey" FOREIGN KEY ("consumerUnitId") REFERENCES "ConsumerUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
