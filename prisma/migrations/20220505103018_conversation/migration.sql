/*
  Warnings:

  - You are about to drop the column `driverId` on the `Drive` table. All the data in the column will be lost.
  - You are about to drop the column `passengerId` on the `Drive` table. All the data in the column will be lost.
  - You are about to drop the column `timeEnd` on the `DriveHistory` table. All the data in the column will be lost.
  - You are about to drop the column `timeStart` on the `DriveHistory` table. All the data in the column will be lost.
  - Added the required column `createtorId` to the `Drive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departurePlace` to the `Drive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Drive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Drive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Drive` DROP FOREIGN KEY `Drive_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `Drive` DROP FOREIGN KEY `Drive_passengerId_fkey`;

-- AlterTable
ALTER TABLE `Drive` DROP COLUMN `driverId`,
    DROP COLUMN `passengerId`,
    ADD COLUMN `createtorId` INTEGER NOT NULL,
    ADD COLUMN `departurePlace` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL,
    ADD COLUMN `type` ENUM('dinho', 'yensau') NOT NULL;

-- AlterTable
ALTER TABLE `DriveHistory` DROP COLUMN `timeEnd`,
    DROP COLUMN `timeStart`,
    ADD COLUMN `cancelReason` VARCHAR(191) NULL,
    ADD COLUMN `driverId` INTEGER NULL,
    ADD COLUMN `passengerId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `participant1Id` INTEGER NOT NULL,
    `participant2` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversationId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `senderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_createtorId_fkey` FOREIGN KEY (`createtorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriveHistory` ADD CONSTRAINT `DriveHistory_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriveHistory` ADD CONSTRAINT `DriveHistory_passengerId_fkey` FOREIGN KEY (`passengerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
