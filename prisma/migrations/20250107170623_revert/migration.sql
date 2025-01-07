/*
  Warnings:

  - You are about to drop the column `userId` on the `Analysis` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Analysis_userId_idx` ON `Analysis`;

-- AlterTable
ALTER TABLE `Analysis` DROP COLUMN `userId`;
