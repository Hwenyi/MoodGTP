/*
  Warnings:

  - Added the required column `sentimentScore` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Analysis` ADD COLUMN `sentimentScore` DOUBLE NOT NULL,
    ADD COLUMN `subject` TEXT NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `mood` TEXT NOT NULL,
    MODIFY `color` TEXT NOT NULL;

-- CreateIndex
CREATE INDEX `Analysis_userId_idx` ON `Analysis`(`userId`);
