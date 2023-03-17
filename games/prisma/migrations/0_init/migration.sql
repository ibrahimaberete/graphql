-- CreateTable
CREATE TABLE `editors` (
    `idEditors` INTEGER NOT NULL AUTO_INCREMENT,
    `nameEditors` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idEditors`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `games` (
    `idGames` INTEGER NOT NULL AUTO_INCREMENT,
    `nameGames` VARCHAR(50) NOT NULL,
    `idEditors` INTEGER NOT NULL,

    INDEX `idEditors`(`idEditors`),
    PRIMARY KEY (`idGames`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock` (
    `idStock` INTEGER NOT NULL AUTO_INCREMENT,
    `idGames` INTEGER NOT NULL,
    `idStores` INTEGER NOT NULL,
    `units` INTEGER NOT NULL,

    INDEX `idGames`(`idGames`),
    INDEX `idStores`(`idStores`),
    PRIMARY KEY (`idStock`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores` (
    `idStores` INTEGER NOT NULL AUTO_INCREMENT,
    `nameStores` VARCHAR(75) NOT NULL,

    PRIMARY KEY (`idStores`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`idEditors`) REFERENCES `editors`(`idEditors`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`idGames`) REFERENCES `games`(`idGames`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`idStores`) REFERENCES `stores`(`idStores`) ON DELETE RESTRICT ON UPDATE RESTRICT;

