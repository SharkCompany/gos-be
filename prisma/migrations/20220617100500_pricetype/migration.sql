/*
  Warnings:

  - You are about to alter the column `price` on the `Drive` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Drive` MODIFY `price` INTEGER NULL;

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `type` ENUM('system', 'regular') NULL DEFAULT 'regular';
