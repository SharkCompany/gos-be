/*
  Warnings:

  - You are about to drop the column `userId` on the `Drive` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Drive` DROP FOREIGN KEY `Drive_userId_fkey`;

-- AlterTable
ALTER TABLE `Drive` DROP COLUMN `userId`,
    ADD COLUMN `matcherId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `updatedAt`;

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_matcherId_fkey` FOREIGN KEY (`matcherId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
