/*
  Warnings:

  - You are about to drop the column `verify` on the `verify` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `verify` DROP COLUMN `verify`,
    ADD COLUMN `is_verify` BOOLEAN NOT NULL DEFAULT false;
