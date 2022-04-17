/*
  Warnings:

  - You are about to drop the column `status` on the `Drive` table. All the data in the column will be lost.
  - Added the required column `status` to the `DriveHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Drive` DROP COLUMN `status`,
    ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `DriveHistory` ADD COLUMN `status` ENUM('waiting', 'preparing', 'onroad', 'completed', 'failed', 'canceled') NOT NULL;
