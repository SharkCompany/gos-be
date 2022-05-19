/*
  Warnings:

  - You are about to drop the column `createtorId` on the `Drive` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `DriveHistory` table. All the data in the column will be lost.
  - You are about to drop the column `passengerId` on the `DriveHistory` table. All the data in the column will be lost.
  - The values [preparing,onroad,completed,failed,canceled] on the enum `DriveHistory_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `userId` on the `Information` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `creatorId` to the `Drive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Drive` DROP FOREIGN KEY `Drive_createtorId_fkey`;

-- DropForeignKey
ALTER TABLE `DriveHistory` DROP FOREIGN KEY `DriveHistory_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `DriveHistory` DROP FOREIGN KEY `DriveHistory_passengerId_fkey`;

-- AlterTable
ALTER TABLE `Drive` DROP COLUMN `createtorId`,
    ADD COLUMN `creatorId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NULL,
    MODIFY `rating` DOUBLE NULL;

-- AlterTable
ALTER TABLE `DriveHistory` DROP COLUMN `driverId`,
    DROP COLUMN `passengerId`,
    MODIFY `status` ENUM('waiting', 'matched') NOT NULL;

-- AlterTable
ALTER TABLE `Information` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
