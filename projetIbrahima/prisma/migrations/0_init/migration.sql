-- CreateTable
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `promotion` INTEGER NOT NULL,
    `trainingid` INTEGER NOT NULL,

    INDEX `FKclasses736275`(`trainingid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitule` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `contenu` VARCHAR(255) NOT NULL,
    `materialsid` INTEGER NOT NULL,
    `trainersid` INTEGER NOT NULL,

    UNIQUE INDEX `intitule`(`intitule`),
    INDEX `FKcourse200295`(`materialsid`),
    INDEX `FKcourse905291`(`trainersid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `temps` INTEGER NOT NULL,
    `contenu` VARCHAR(255) NOT NULL,
    `materialsid` INTEGER NOT NULL,
    `trainersid` INTEGER NOT NULL,

    INDEX `FKexams327578`(`trainersid`),
    INDEX `FKexams622581`(`materialsid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitule` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `objectifs` VARCHAR(255) NOT NULL,
    `prerequis` VARCHAR(255) NOT NULL,
    `temps` INTEGER NOT NULL,

    UNIQUE INDEX `intitule`(`intitule`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials_training` (
    `materialsid` INTEGER NOT NULL,
    `trainingid` INTEGER NOT NULL,

    INDEX `FKmaterials_p864207`(`trainingid`),
    PRIMARY KEY (`materialsid`, `trainingid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserver_salle_classes` (
    `salle_classesid` INTEGER NOT NULL,
    `classesid` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `heure_debut` INTEGER NOT NULL,
    `heure_fin` INTEGER NOT NULL,

    INDEX `FKreserver_s256587`(`classesid`),
    PRIMARY KEY (`salle_classesid`, `classesid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salle_classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `taille` INTEGER NOT NULL,
    `est_disponible` BOOLEAN NOT NULL,

    UNIQUE INDEX `nom`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studiant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_etudiant` INTEGER NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `prenom` VARCHAR(255) NOT NULL,
    `date_naissance` DATE NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `mot_de_passe` VARCHAR(255) NOT NULL,
    `classesid` INTEGER NOT NULL,

    UNIQUE INDEX `num_etudiant`(`num_etudiant`),
    UNIQUE INDEX `email`(`email`),
    INDEX `FKstudiant119936`(`classesid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studiant_exams` (
    `studiantid` INTEGER NOT NULL,
    `examsid` INTEGER NOT NULL,
    `note` INTEGER NOT NULL,

    INDEX `FKstudiant_con197016`(`examsid`),
    PRIMARY KEY (`studiantid`, `examsid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trainers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_trainer` INTEGER NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `prenom` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `mot_de_passe` VARCHAR(255) NOT NULL,
    `cv` VARCHAR(255) NULL,

    UNIQUE INDEX `num_trainer`(`num_trainer`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitule` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `objectifs` VARCHAR(255) NOT NULL,
    `deboucher` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `intitule`(`intitule`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `FKclasses736275` FOREIGN KEY (`trainingid`) REFERENCES `training`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `FKcourse200295` FOREIGN KEY (`materialsid`) REFERENCES `materials`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `FKcourse905291` FOREIGN KEY (`trainersid`) REFERENCES `trainers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `FKexams327578` FOREIGN KEY (`trainersid`) REFERENCES `trainers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `FKexams622581` FOREIGN KEY (`materialsid`) REFERENCES `materials`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `materials_training` ADD CONSTRAINT `FKmaterials_p697703` FOREIGN KEY (`materialsid`) REFERENCES `materials`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `materials_training` ADD CONSTRAINT `FKmaterials_p864207` FOREIGN KEY (`trainingid`) REFERENCES `training`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reserver_salle_classes` ADD CONSTRAINT `FKreserver_s256587` FOREIGN KEY (`classesid`) REFERENCES `classes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reserver_salle_classes` ADD CONSTRAINT `FKreserver_s458962` FOREIGN KEY (`salle_classesid`) REFERENCES `salle_classes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studiant` ADD CONSTRAINT `FKstudiant119936` FOREIGN KEY (`classesid`) REFERENCES `classes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studiant_exams` ADD CONSTRAINT `FKstudiant_con197016` FOREIGN KEY (`examsid`) REFERENCES `exams`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studiant_exams` ADD CONSTRAINT `FKstudiant_con587555` FOREIGN KEY (`studiantid`) REFERENCES `studiant`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

