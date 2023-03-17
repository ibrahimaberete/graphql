INSERT INTO training (intitule, description, objectifs, deboucher) 
VALUES
    ('Programmation débutant', 'Ce parcourse est destiné aux personnes souhaitant apprendre les bases de la programmation', 'Comprendre les concepts de la programmation et être en mesure de créer des programmes simples', 'Développeur débutant'),
    ('Programmation avancé', 'Ce parcourse est destiné aux personnes ayant déjà des connaissances en programmation et souhaitant les approfondir', 'Comprendre les concepts avancés de la programmation et être en mesure de créer des programmes plus complexes', 'Développeur expérimenté'),
    ('Développement Web', 'Ce parcourse est destiné aux personnes souhaitant apprendre à développer des sites Web', 'Comprendre les concepts fondamentaux du développement Web et être en mesure de créer des sites Web', 'Développeur Web débutant');

INSERT INTO classes (nom, promotion, parcourseid)
VALUES
  ('Classe 1', 2020, 1),
  ('Classe 2', 2021, 2),
  ('Classe 3', 2022, 3);

INSERT INTO salle_classes (nom, taille, est_disponible)
VALUES 
  ('Salle 101', 50, TRUE),
  ('Salle 102', 60, FALSE),
  ('Salle 103', 70, TRUE);

INSERT INTO reserver_salle_classes (salle_classesid, classesid, date, heure_debut, heure_fin)
VALUES 
  (1, 1, '2023-02-01', 9, 11),
  (2, 2, '2023-02-02', 10, 12),
  (3, 3, '2023-02-03', 11, 13);

INSERT INTO trainers (num_trainer, nom, prenom, email, mot_de_passe, cv)
VALUES
  (1, 'Jane', 'Doe', 'jane.doe@email.com', 'password1', 'Mon CV'),
  (2, 'John', 'Doe', 'john.doe@email.com', 'password2', 'Mon CV'),
  (3, 'Bob', 'Smith', 'bob.smith@email.com', 'password3', 'Mon CV');

INSERT INTO materials (intitule, description, objectifs, prerequis, temps) 
VALUES
    ('Programmation orientée objet', 'Introduction aux concepts de la programmation orientée objet', 'Comprendre les bases de la programmation orientée objet', 'Aucun', 30),
    ('Bases de données', 'Introduction aux bases de données relationnelles', 'Comprendre les concepts de bases de données relationnelles et comment les utiliser dans la programmation', 'Programmation orientée objet', 40),
    ('Développement Web', 'Introduction au développement Web avec HTML, CSS et JavaScript', 'Comprendre les concepts fondamentaux du développement Web et comment créer des pages Web interactives', 'Programmation orientée objet', 45),
    ('Algorithmes', 'Introduction aux algorithmes', 'Comprendre les algorithmes de base', 'Aucun prérequis', 120),
    ('Programmation objet en Java', 'Programmation objet en Java', 'Apprendre à programmer en Java', 'Connaissance en programmation', 150);

INSERT INTO materials_training (materialsid, trainingid)
VALUES 
  (1, 1),
  (2, 2),
  (3, 3);

INSERT INTO exams ("date", temps, contenu, matieresid, formateursid)
VALUES
  ('2023-01-01', 120, 'Contrôle sur les fondamentaux', 1, 1),
  ('2023-02-01', 90, 'Examen sur les algorithmes', 2, 2),
  ('2023-03-01', 150, 'Test sur la programmation objet', 3, 3);

INSERT INTO course (intitule, description, contenu, matieresid, formateursid)
VALUES
  ('Cours 1', 'Introduction aux algorithmes', 'Les algorithmes de base et les algorithmes avancés', 1, 1),
  ('Cours 2', 'Programmation objet en Java', 'Les concepts de base de la programmation objet en Java', 2, 2),
  ('Cours 3', 'Bases de données', 'Les différents types de bases de données et les différentes techniques de requêtage', 3, 3);

INSERT INTO studiant (num_etudiant, nom, prenom, date_naissance, email, mot_de_passe, classesid)
VALUES
  (1, 'John', 'Doe', '2000-01-01', 'john.doe@email.com', 'password1', 1),
  (2, 'Jane', 'Doe', '2001-01-01', 'jane.doe@email.com', 'password2', 2),
  (3, 'Bob', 'Smith', '1999-01-01', 'bob.smith@email.com', 'password3', 3);

INSERT INTO studiant_exams (studiantid, examsid, note)
VALUES
  (1, 1, 15),
  (2, 2, 18),
  (3, 3, 20);

INSERT INTO exams (date, temps, contenu, matieresid, formateursid)
VALUES 
  ('2023-01-01', 120, 'Contrôle de mathématiques', 1, 1),
  ('2023-02-01', 90, 'Contrôle de français', 2, 2),
  ('2023-03-01', 75, 'Contrôle d''histoire', 3, 3);