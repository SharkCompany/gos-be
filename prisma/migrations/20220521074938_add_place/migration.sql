/*
  Warnings:

  - You are about to drop the column `departurePlace` on the `Drive` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Drive` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[destinationId]` on the table `Drive` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departureId]` on the table `Drive` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departureId` to the `Drive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `Drive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Drive` DROP COLUMN `departurePlace`,
    DROP COLUMN `destination`,
    ADD COLUMN `departureId` INTEGER NOT NULL,
    ADD COLUMN `destinationId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Place` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Drive_destinationId_key` ON `Drive`(`destinationId`);

-- CreateIndex
CREATE UNIQUE INDEX `Drive_departureId_key` ON `Drive`(`departureId`);

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_departureId_fkey` FOREIGN KEY (`departureId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
