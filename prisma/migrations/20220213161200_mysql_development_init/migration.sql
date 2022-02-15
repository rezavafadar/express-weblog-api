-- CreateTable
CREATE TABLE `EmailConfirmation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `confirm_code` VARCHAR(191) NOT NULL,
    `time_expire` DATETIME(3) NOT NULL,
    `verify` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
