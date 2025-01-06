/*
  Warnings:

  - You are about to drop the column `creactedAt` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `creactedAt` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `creactedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Analysis` DROP COLUMN `creactedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `JournalEntry` DROP COLUMN `creactedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `creactedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
