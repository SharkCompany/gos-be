/*
  Warnings:

  - You are about to drop the column `participant1Id` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `participant1` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_userId_fkey`;

-- AlterTable
ALTER TABLE `Conversation` DROP COLUMN `participant1Id`,
    DROP COLUMN `userId`,
    ADD COLUMN `participant1` INTEGER NOT NULL;
