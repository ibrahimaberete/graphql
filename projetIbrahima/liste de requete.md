query {
  
  getClasses {
    id
    name
    promotion
    trainingid
  }

  
  getExams{
    id
    date
    temps
    contenu
    materialsid
    trainersid
  }
  
  getCourse {
    id
    intitule
    description
    contenu
    materialsid
    trainersid
  }
  
   getStudiant {
    id
    num_etudiant
    nom
    prenom
    date_naissance
    email
    mot_de_passe
    classesid
  }
  

  getStudiant_exams {
    studiantid
    examsid
    note
  }
  
     getTrainers {
    id
    num_trainer
    nom
    prenom
    email
    mot_de_passe
    cv
  }
  
  getMaterials {
    id
    intitule
    description
    objectifs
    prerequis
    temps
  }
  
  
  getMaterials_training {
    materialsid
    trainingid
  }
  
  getReserver_salle_classes{
    salle_classesid
    classesid
    date
    heure_debut
    heure_fin
    
  } 
  
}

parcours
mutation {
  createTraining(intitule: "Licence en informatique", description: "Formation en informatique", objectifs: "Former des informaticiens compétents", deboucher: "Débouchés professionnels variés") {
    id
    intitule
    description
    objectifs
    deboucher
  }
}
formatteur

mutation {
  createTrainers(num_trainer: 2345, nom: "fgfgf", prenom: "fhfhf", email: "john.doe@exaffufufmehple.com", mot_de_passe: "password", cv: "Ingénieur diplômé en informatique") {
    id
    num_trainer
    nom
    prenom
    email
    mot_de_passe
    cv
  }
}

mutation {
  createClasses(name: "Class A", promotion: 2023, trainingid: 1) {
    id
    name
    promotion
    trainingid
  }
}

mutation {
  createStudiant(num_etudiant: 2341, nom: "Dupont", prenom: "Jean", date_naissance: "2001-02-24T08:30:00.000Z", email: "jeaggn.dupont@example.com", mot_de_passe: "password", classesid: 1) {
    id
    num_etudiant
    nom
    prenom
    date_naissance
    email
    mot_de_passe
    classesid
  }
}

mutation {
  createMaterials(intitule: "Algorithmique et programmation", description: "Cours d'algorithmique et de programmation", objectifs: "Apprendre à concevoir et à écrire des programmes informatiques", prerequis: "Aucun", temps: 50) {
    id
    intitule
    description
    objectifs
    prerequis
    temps
  }
}

mutation {
  createCourse(intitule: "Ihntroduction à la physique", description: "Cours d'introduction à la physique", contenu: "Introduction aux concepts de base de la physique", matieresid: 2, formateursid: 2) {
    id
    intitule
    description
    contenu
    materialsid
    trainersid
  }
}

#
mutation {
  createCourse(intitule: "ggg à la physique", description: "Cours d'introduction à la physique", contenu: "Introduction aux concepts de base de la physique", materialsid: 1, trainersid: 2) {
    id
    intitule
    description
    contenu
    materialsid
    trainersid
  }
}

mutation {
  createMaterials_training(materialsid: 1, trainingid: 2) {
    materialsid
    trainingid
  }
}

mutation {
  createExams(date: "2023-02-24T08:30:00.000Z", temps: 25, contenu: "Examen de mathématiques", materialsid: 1, trainersid: 1) {
    id
    date
    temps
    contenu
    materialsid
    trainersid
  }
}

mutation {
  createStudiant_exams(studiantid: 4, examsid: 1, note: 15) {
    studiantid
    examsid
    note
  }
}

mutation {
  createSalle_classes(
    nom: "Salle 2"
    taille: 30
    est_disponible: true
  ) {
    id
    nom
    taille
    est_disponible
  }
}

