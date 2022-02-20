-- AlterTable
ALTER TABLE `verify` ADD COLUMN `type` ENUM('login', 'register', 'modify') NOT NULL DEFAULT 'register';
