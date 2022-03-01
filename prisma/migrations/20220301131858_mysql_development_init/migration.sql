/*
  Warnings:

  - You are about to drop the column `fullname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `fullname`,
    DROP COLUMN `role`,
    DROP COLUMN `username`;

-- AlterTable
ALTER TABLE `userprofile` ADD COLUMN `fullname` VARCHAR(191) NOT NULL DEFAULT 'unknown user',
    ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserProfile_username_key` ON `UserProfile`(`username`);
