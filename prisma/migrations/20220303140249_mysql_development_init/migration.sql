/*
  Warnings:

  - The `age` column on the `userprofile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `userprofile` DROP COLUMN `age`,
    ADD COLUMN `age` DATETIME(3) NULL;
