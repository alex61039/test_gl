-- CreateTable
CREATE TABLE `Action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name_action` VARCHAR(50) NOT NULL,
    `number_of_gifts` INTEGER NOT NULL,
    `taking_a_gift` INTEGER NOT NULL,
    `receiving_a_gift` INTEGER NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `card_numbers` VARCHAR(5000) NOT NULL,
    `giftId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `amount` INTEGER NOT NULL,
    `gift_value` DECIMAL(65, 30) NOT NULL,
    `end_date_gift` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Action` ADD CONSTRAINT `Action_giftId_fkey` FOREIGN KEY (`giftId`) REFERENCES `Gift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
