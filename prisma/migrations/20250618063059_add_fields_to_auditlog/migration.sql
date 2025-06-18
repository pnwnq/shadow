/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `AuditLog` table. All the data in the column will be lost.
  - The `level` column on the `AuditLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `entityId` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityType` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AuditLog_action_idx";

-- DropIndex
DROP INDEX "AuditLog_level_idx";

-- DropIndex
DROP INDEX "AuditLog_userId_idx";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "ipAddress",
DROP COLUMN "message",
ADD COLUMN     "entityId" TEXT NOT NULL,
ADD COLUMN     "entityType" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT,
ADD COLUMN     "type" TEXT,
DROP COLUMN "level",
ADD COLUMN     "level" TEXT;
