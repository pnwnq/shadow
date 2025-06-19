/*
  Warnings:

  - The values [DECOMMISSIONED] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dueDate` on the `Item` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemStatus_new" AS ENUM ('IN_STOCK', 'BORROWED', 'IN_REPAIR', 'DISPOSED');
ALTER TABLE "Item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Item" ALTER COLUMN "status" TYPE "ItemStatus_new" USING ("status"::text::"ItemStatus_new");
ALTER TYPE "ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "ItemStatus_old";
ALTER TABLE "Item" ALTER COLUMN "status" SET DEFAULT 'IN_STOCK';
COMMIT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "dueDate",
ADD COLUMN     "borrowedAt" TIMESTAMP(3);
