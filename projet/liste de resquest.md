
mutation {
  createFormateurs(num_formateur: 12334, nom: "Doe", prenom: "John", email: "john.doe@examehple.com", mot_de_passe: "password", cv: "Ingénieur diplômé en informatique") {
    id
    num_formateur
    nom
    prenom
    email
    mot_de_passe
    cv
  }
}



mutation {
  createParcours(intitule: "Licence en informatique", descriptionn: "Formation en informatique", objectifs: "Former des informaticiens compétents", deboucher: "Débouchés professionnels variés") {
    id
    intitule
    descriptionn
    objectifs
    deboucher
  }
}

mutation {
  createClasses(nom: "Class A", promotion: 2023, parcoursid: 1) {
    id
    nom
    promotion
    parcoursid
  }
}


mutation {
  createEleves(num_etudiant: 2341, nom: "Dupont", prenom: "Jean", date_naissance: "2001-02-24T08:30:00.000Z", email: "jeaggn.dupont@example.com", mot_de_passe: "password", classesid: 1) {
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
  createMatieres(intitule: "Algorithmique et programmation", description: "Cours d'algorithmique et de programmation", objectifs: "Apprendre à concevoir et à écrire des programmes informatiques", prerequis: "Aucun", temps: 50) {
    id
    intitule
    description
    objectifs
    prerequis
    temps
  }
}


mutation {
  createCours(intitule: "Ihntroduction à la physique", description: "Cours d'introduction à la physique", contenu: "Introduction aux concepts de base de la physique", matieresid: 2, formateursid: 2) {
    id
    intitule
    description
    contenu
    matieresid
    formateursid
  }
}

mutation {
  createMatieres_parcours(matieresid: 1, parcoursid: 2) {
    matieresid
    parcoursid
  }
}


mutation {
  createControlles(date: "2023-02-24T08:30:00.000Z", temps: 25, contenu: "Examen de mathématiques", matieresid: 1, formateursid: 1) {
    id
    date
    temps
    contenu
    matieresid
    formateursid
  }
}


mutation {
  createEleves_controlles(elevesid: 4, controllesid: 1, note: 15) {
    elevesid
    controllesid
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



mutation {
  createReserver_salle_classes(
    salle_classesid: 1
    classesid: 2
    date: "2023-02-24T14:30:00.000Z"
    heure_debut: 14
    heure_fin: 16
  ) {
    salle_classesid
    classesid
    date
    heure_debut
    heure_fin
  }
}

mutation {
  createReserver_salle_classes(
    salle_classesid: 1
    classesid: 2
    date: "2023-02-24T14:30:00.000Z"
    heure_debut: 14
    heure_fin: 16
  ) {
    salle_classesid
    classesid
    date
    heure_debut
    heure_fin
  }
}


query {
  
  getClasses {
    id
    nom
    promotion
    parcoursid
  }

  
  getControlles {
    id
    date
    temps
    contenu
    matieresid
    formateursid
  }
  
  getCours {
    id
    intitule
    description
    contenu
    matieresid
    formateursid
  }
  
   getEleves {
    id
    num_etudiant
    nom
    prenom
    date_naissance
    email
    mot_de_passe
    classesid
  }
  
  getEleves_controlles {
    elevesid
    controllesid
    note
  }
  
   getFormateurs {
    id
    num_formateur
    nom
    prenom
    email
    mot_de_passe
    cv
  }
  
  getMatieres {
    id
    intitule
    description
    objectifs
    prerequis
    temps
  }
  
  getMatieres_parcours {
    matieresid
    parcoursid
  }
  
  getReserver_salle_classes{
    salle_classesid
    classesid
    date
    heure_debut
    heure_fin
    
  }


  
  
}
