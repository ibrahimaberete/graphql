CREATE TABLE `classes` (
  id        INTEGER NOT NULL AUTO_INCREMENT, 
  name        varchar(255) NOT NULL, 
  promotion  integer NOT NULL, 
  trainingid integer NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE `exams` (
  id          INTEGER NOT NULL AUTO_INCREMENT, 
  date       date NOT NULL, 
  temps        integer NOT NULL, 
  contenu      varchar(255) NOT NULL, 
  materialsid   integer NOT NULL, 
  trainersid integer NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE `course` (
  id          INTEGER NOT NULL AUTO_INCREMENT, 
  intitule     varchar(255) NOT NULL UNIQUE, 
  description  varchar(255) NOT NULL, 
  contenu      varchar(255) NOT NULL, 
  materialsid   integer NOT NULL, 
  trainersid integer NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE `studiant` (
  id            INTEGER NOT NULL AUTO_INCREMENT, 
  num_etudiant   integer NOT NULL UNIQUE, 
  nom            varchar(255) NOT NULL, 
  prenom          varchar(255) NOT NULL, 
  date_naissance date NOT NULL, 
  email          varchar(255) NOT NULL UNIQUE, 
  mot_de_passe   varchar(255) NOT NULL, 
  classesid      integer NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE `studiant_exams` (
  studiantid     integer NOT NULL, 
  examsid integer NOT NULL, 
  note         integer NOT NULL, 
  PRIMARY KEY (studiantid, 
  examsid));

CREATE TABLE `trainers` (
  id           INTEGER NOT NULL AUTO_INCREMENT, 
  num_trainer integer NOT NULL UNIQUE, 
  nom           varchar(255) NOT NULL, 
  prenom        varchar(255) NOT NULL, 
  email         varchar(255) NOT NULL UNIQUE, 
  mot_de_passe  varchar(255) NOT NULL, 
  cv            varchar(255), 
  PRIMARY KEY (id));

CREATE TABLE `materials` (
  id         INTEGER NOT NULL AUTO_INCREMENT, 
  intitule    varchar(255) NOT NULL UNIQUE, 
  description varchar(255) NOT NULL, 
  objectifs   varchar(255) NOT NULL, 
  prerequis   varchar(255) NOT NULL, 
  temps       integer NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE `materials_training` (
  materialsid integer NOT NULL, 
  trainingid integer NOT NULL, 
  PRIMARY KEY (materialsid, 
  trainingid));

CREATE TABLE `training` (
  id         INTEGER NOT NULL AUTO_INCREMENT, 
  intitule    varchar(255) NOT NULL UNIQUE, 
  description varchar(255) NOT NULL, 
  objectifs   varchar(255) NOT NULL, 
  deboucher   varchar(255) NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE `reserver_salle_classes` (
  salle_classesid integer NOT NULL, 
  classesid       integer NOT NULL, 
  date          date NOT NULL, 
  heure_debut     integer NOT NULL, 
  heure_fin       integer NOT NULL, 
  PRIMARY KEY (salle_classesid, 
  classesid));

CREATE TABLE `salle_classes` (
  id            INTEGER NOT NULL AUTO_INCREMENT, 
  nom            varchar(255) NOT NULL UNIQUE, 
  taille         integer NOT NULL, 
  est_disponible bool NOT NULL,
  PRIMARY KEY (id));
ALTER TABLE course ADD CONSTRAINT FKcourse200295 FOREIGN KEY (materialsid) REFERENCES materials (id) ON DELETE CASCADE;
ALTER TABLE exams ADD CONSTRAINT FKexams622581 FOREIGN KEY (materialsid) REFERENCES materials (id) ON DELETE CASCADE;
ALTER TABLE classes ADD CONSTRAINT FKclasses736275 FOREIGN KEY (trainingid) REFERENCES training (id) ON DELETE CASCADE;
ALTER TABLE studiant ADD CONSTRAINT FKstudiant119936 FOREIGN KEY (classesid) REFERENCES classes (id);
ALTER TABLE reserver_salle_classes ADD CONSTRAINT FKreserver_s458962 FOREIGN KEY (salle_classesid) REFERENCES salle_classes (id) ON DELETE CASCADE;
ALTER TABLE reserver_salle_classes ADD CONSTRAINT FKreserver_s256587 FOREIGN KEY (classesid) REFERENCES classes (id) ON DELETE CASCADE;
ALTER TABLE exams ADD CONSTRAINT FKexams327578 FOREIGN KEY (trainersid) REFERENCES trainers (id) ON DELETE CASCADE;
ALTER TABLE course ADD CONSTRAINT FKcourse905291 FOREIGN KEY (trainersid) REFERENCES trainers (id) ON DELETE CASCADE;
ALTER TABLE materials_training ADD CONSTRAINT FKmaterials_p697703 FOREIGN KEY (materialsid) REFERENCES materials (id) ON DELETE CASCADE;
ALTER TABLE materials_training ADD CONSTRAINT FKmaterials_p864207 FOREIGN KEY (trainingid) REFERENCES training (id) ON DELETE CASCADE;
ALTER TABLE studiant_exams ADD CONSTRAINT FKstudiant_con587555 FOREIGN KEY (studiantid) REFERENCES studiant (id) ON DELETE CASCADE;
ALTER TABLE studiant_exams ADD CONSTRAINT FKstudiant_con197016 FOREIGN KEY (examsid) REFERENCES exams (id) ON DELETE CASCADE;