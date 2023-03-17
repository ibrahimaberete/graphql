-- CreateTable fait
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `promotion` INTEGER NOT NULL,
    `parcoursid` INTEGER NOT NULL,

    INDEX `FKclasses736275`(`parcoursid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `controlles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `temps` INTEGER NOT NULL,
    `contenu` VARCHAR(255) NOT NULL,
    `matieresid` INTEGER NOT NULL,
    `formateursid` INTEGER NOT NULL,

    INDEX `FKcontrolles327578`(`formateursid`),
    INDEX `FKcontrolles622581`(`matieresid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitule` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `contenu` VARCHAR(255) NOT NULL,
    `matieresid` INTEGER NOT NULL,
    `formateursid` INTEGER NOT NULL,

    UNIQUE INDEX `intitule`(`intitule`),
    INDEX `FKcours200295`(`matieresid`),
    INDEX `FKcours905291`(`formateursid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eleves` (
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
    INDEX `FKeleves119936`(`classesid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eleves_controlles` (
    `elevesid` INTEGER NOT NULL,
    `controllesid` INTEGER NOT NULL,
    `note` INTEGER NOT NULL,

    INDEX `FKeleves_con197016`(`controllesid`),
    PRIMARY KEY (`elevesid`, `controllesid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formateurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_formateur` INTEGER NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `prenom` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `mot_de_passe` VARCHAR(255) NOT NULL,
    `cv` VARCHAR(255) NULL,

    UNIQUE INDEX `num_formateur`(`num_formateur`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matieres` (
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
CREATE TABLE `matieres_parcours` (
    `matieresid` INTEGER NOT NULL,
    `parcoursid` INTEGER NOT NULL,

    INDEX `FKmatieres_p864207`(`parcoursid`),
    PRIMARY KEY (`matieresid`, `parcoursid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable fait
CREATE TABLE `parcours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitule` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `objectifs` VARCHAR(255) NOT NULL,
    `deboucher` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `intitule`(`intitule`),
    PRIMARY KEY (`id`)
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

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `FKclasses736275` FOREIGN KEY (`parcoursid`) REFERENCES `parcours`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `controlles` ADD CONSTRAINT `FKcontrolles327578` FOREIGN KEY (`formateursid`) REFERENCES `formateurs`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `controlles` ADD CONSTRAINT `FKcontrolles622581` FOREIGN KEY (`matieresid`) REFERENCES `matieres`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `FKcours200295` FOREIGN KEY (`matieresid`) REFERENCES `matieres`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `FKcours905291` FOREIGN KEY (`formateursid`) REFERENCES `formateurs`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `eleves` ADD CONSTRAINT `FKeleves119936` FOREIGN KEY (`classesid`) REFERENCES `classes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `eleves_controlles` ADD CONSTRAINT `FKeleves_con197016` FOREIGN KEY (`controllesid`) REFERENCES `controlles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `eleves_controlles` ADD CONSTRAINT `FKeleves_con587555` FOREIGN KEY (`elevesid`) REFERENCES `eleves`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matieres_parcours` ADD CONSTRAINT `FKmatieres_p697703` FOREIGN KEY (`matieresid`) REFERENCES `matieres`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matieres_parcours` ADD CONSTRAINT `FKmatieres_p864207` FOREIGN KEY (`parcoursid`) REFERENCES `parcours`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reserver_salle_classes` ADD CONSTRAINT `FKreserver_s256587` FOREIGN KEY (`classesid`) REFERENCES `classes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reserver_salle_classes` ADD CONSTRAINT `FKreserver_s458962` FOREIGN KEY (`salle_classesid`) REFERENCES `salle_classes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

