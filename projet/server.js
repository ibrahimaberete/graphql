const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json())
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};


let schema = buildSchema (
    `
        scalar Date

        type Classes {
            id: Int!
            nom: String!
            promotion: Int!
            parcoursid: Int!
        }

        type Controlles {
            id: Int!
            date: Date!
            temps: Int!
            contenu: String!
            matieresid: Int!
            formateursid: Int!
        }

        type Cours {
            id: Int!
            intitule: String!
            description: String!
            contenu: String!
            matieresid: Int!
            formateursid: Int!
        }

        type Eleves {
            id: Int!
            num_etudiant: Int!
            nom: String!
            prenom: String!
            date_naissance: Date!
            email: String!
            mot_de_passe: String!
            classesid: Int!
        }

        type Eleves_controlles {
            elevesid: Int!
            controllesid: Int!
            note: Int!
        }

        type Formateurs {
            id: Int!
            num_formateur: Int!
            nom: String!
            prenom: String!
            email: String!
            mot_de_passe: String!
            cv: String!
        }

        type Matieres {
            id: Int!
            intitule: String!
            description: String!
            objectifs: String!
            prerequis: String!
            temps: Int!
        }

        type Matieres_parcours {
            matieresid: Int!
            parcoursid: Int!
        }

        type Parcours {
            id: Int!
            intitule: String!
            description: String!
            objectifs: String!
            deboucher: String!
        }

        type Reserver_salle_classes {
            salle_classesid: Int!
            classesid: Int!
            date: Date!
            heure_debut: Int!
            heure_fin: Int!
        }

        type Salle_classes {
            id: Int!
            nom: String!
            taille: Int!
            est_disponible: Boolean!
        }

        type Query {
            getClasses: [Classes]
            getControlles: [Controlles]
            getCours: [Cours]
            getEleves: [Eleves]
            getEleves_controlles: [Eleves_controlles]
            getFormateurs: [Formateurs]
            getMatieres: [Matieres]
            getMatieres_parcours: [Matieres_parcours]
            getParcours: [Parcours]
            getReserver_salle_classes: [Reserver_salle_classes]
            getSalle_classes: [Salle_classes]

            getClassesById(id: Int): Classes
            getControllesById(id: Int): Controlles
            getCoursById(id: Int): Cours
            getElevesById(id: Int): Eleves
            getEleves_controllesById(id: Int): Eleves_controlles
            getFormateursById(id: Int): Formateurs
            getMatieresById(id: Int): Matieres
            getMatieres_parcoursById(id: Int): Matieres_parcours
            getParcoursById(id: Int): Parcours
            getReserver_salle_classesById(id: Int): Reserver_salle_classes
            getSalle_classesById(id: Int): Salle_classes
        }
        
        type Mutation {
            createClasses(nom: String, promotion: Int, parcoursid: Int): Classes
            createControlles(date: Date, temps: Int, contenu: String, matieresid: Int, formateursid: Int): Controlles
            createCours(intitule: String,description: String,contenu: String,matieresid: Int,formateursid: Int): Cours
            createEleves(num_etudiant: Int,nom: String,prenom: String,date_naissance: Date,email: String,mot_de_passe: String,classesid: Int): Eleves
            createEleves_controlles(elevesid: Int,controllesid: Int,note: Int): Eleves_controlles
            createFormateurs(num_formateur: Int,nom: String,prenom: String,email: String,mot_de_passe: String,cv: String): Formateurs
            createMatieres(intitule: String,description: String,objectifs: String,prerequis: String,temps: Int): Matieres
            createMatieres_parcours(matieresid: Int, parcoursid: Int): Matieres_parcours
            createParcours(intitule: String,description: String,objectifs: String,deboucher: String): Parcours
            createReserver_salle_classes(salle_classesid: Int,classesid: Int,date: Date,heure_debut: Int,heure_fin: Int): Reserver_salle_classes
            createSalle_classes(nom: String,taille: Int,est_disponible: Boolean): Salle_classes

            deleteClasses(id: Int): Classes
            deleteControlles(id: Int): Controlles
            deleteCours(id: Int): Cours
            deleteEleves(id: Int): Eleves
            deleteEleves_controlles(id: Int): Eleves_controlles
            deleteFormateurs(id: Int): Formateurs
            deleteMatieres(id: Int): Matieres
            deleteMatieres_parcours(id: Int): Matieres_parcours
            deleteParcours(id: Int): Parcours
            deleteReserver_salle_classes(id: Int): Reserver_salle_classes
            deleteSalle_classes(id: Int): Salle_classes

            updateClasses(id: Int, nom: String, promotion: Int, parcoursid: Int): Classes
            updateControlles(id: Int, date: Date, temps: Int, contenu: String, matieresid: Int, formateursid: Int): Controlles
            updateCours(id: Int, intitule: String,description: String,contenu: String,matieresid: Int,formateursid: Int): Cours
            updateEleves(id: Int, num_etudiant: Int,nom: String,prenom: String,date_naissance: Date,email: String,mot_de_passe: String,classesid: Int): Eleves
            updateEleves_controlles(elevesid: Int,controllesid: Int,note: Int): Eleves_controlles
            updateFormateurs(id: Int, num_formateur: Int,nom: String,prenom: String,email: String,mot_de_passe: String,cv: String): Formateurs
            updateMatieres(id: Int, intitule: String,description: String,objectifs: String,prerequis: String,temps: Int): Matieres
            updateMatieres_parcours(matieresid: Int, parcoursid: Int): Matieres_parcours
            updateParcours(id: Int,description: String,objectifs: String,deboucher: String): Parcours
            updateReserver_salle_classes(salle_classesid: Int,classesid: Int,date: Date,heure_debut: Int,heure_fin: Int): Reserver_salle_classes
            updateSalle_classes(id: Int, nom: String,taille: Int,est_disponible: Boolean): Salle_classes
        }
    `
);

let root = { 
    // PARCOURS
    getParcours: async () => {
        return await prisma.parcours.findMany();
    },
    getParcoursById: async ({id}) => {
        return await prisma.parcours.findUnique({
            where: {
              id: id,
            },
        });
    },
    createParcours: async ({intitule, description, objectifs, deboucher}) => {
        return await prisma.parcours.create({
        data: {
            intitule: intitule,
            description: description,
            objectifs: objectifs,
            deboucher: deboucher
           }
        });
    },
    deleteParcours: async ({id}) => {
        return await prisma.parcours.delete({
            where: {
                id: id,
            },
        });
    },
    updateParcours: async ({id, intitule, description, objectifs, deboucher}) => {
        await prisma.parcours.update({
            where: {
                id: id,
            },
            data: {
                intitule: intitule,
                description: description,
                objectifs: objectifs,
                deboucher: deboucher
            }
        });
    },

    // CLASSES
    getClasses: async () => {
        return await prisma.classes.findMany();
    },
    getClassesById: async ({id}) => {
        return await prisma.classes.findUnique({
            where: {
              id: id,
            },
        });
    },
    createClasses: async ({nom, promotion, parcoursid}) => {
        return await prisma.classes.create({
            data: {
                nom: nom,
                promotion: promotion,
                parcoursid: parcoursid
           }
        });
    },
    deleteClasses: async ({id}) => {
        return await prisma.classes.delete({
            where: {
                id: id,
            },
        });
    },
    updateClasses: async ({id, nom, promotion, parcoursid}) => {
        await prisma.classes.update({
            where: {
                id: id,
            },
            data: {
                nom: nom,
                promotion: promotion,
                parcoursid: parcoursid
            }
        });
    },
    
    // CONTROLLES
    getControlles: async () => {
        return await prisma.controlles.findMany();
    },
    getControllesById: async ({id}) => {
        return await prisma.controlles.findUnique({
            where: {
              id: id,
            },
        });
    },
    createControlles: async ({date, temps, contenu, matieresid, formateursid}) => {
        return await prisma.controlles.create({
            data: {
                date: date,
                temps: temps,
                contenu: contenu,
                matieresid: matieresid,
                formateursid: formateursid
           }
        });
    },
    deleteControlles: async ({id}) => {
        return await prisma.controlles.delete({
            where: {
                id: id,
            },
        });
    },
    updateControlles: async ({id, date, temp, contenu, matieresid, formateursid}) => {
        await prisma.controlles.update({
            where: {
                id: id,
            },
            data: {
                date: date,
                temp: temp,
                contenu: contenu,
                matieresid: matieresid,
                formateursid: formateursid
            }
        });
    },
    
    // COURS
    getCours: async () => {
        return await prisma.cours.findMany();
    },
    getCoursById: async ({id}) => {
        return await prisma.cours.findUnique({
            where: {
              id: id,
            },
        });
    },
    createCours: async ({intitule, description, contenu, matieresid, formateursid}) => {
        return await prisma.cours.create({
            data: {
                intitule: intitule,
                description: description,
                contenu: contenu,
                matieresid: matieresid,
                formateursid: formateursid
           }
        });
    },
    deleteCours: async ({id}) => {
        return await prisma.cours.delete({
            where: {
                id: id,
            },
        });
    },
    updateCours: async ({intitule, description, contenu, matieresid, formateursid}) => {
        await prisma.cours.update({
            where: {
                id: id,
            },
            data: {
                intitule: intitule,
                description: description,
                contenu: contenu,
                matieresid: matieresid,
                formateursid: formateursid
            }
        });
    },
    
    // ELEVES
    getEleves: async () => {
        return await prisma.eleves.findMany();
    },
    getElevesById: async ({id}) => {
        return await prisma.eleves.findUnique({
            where: {
              id: id,
            },
        });
    },
    createEleves: async ({num_etudiant, nom, prenom, date_naissance, email, mot_de_passe, classesid}) => {
        const plainPassword = '';
        const hashedPassword = await hashPassword(plainPassword);
            console.log(mot_de_passe);
        return await prisma.eleves.create({
            data: {
                num_etudiant: num_etudiant,
                nom: nom,
                prenom: prenom,
                date_naissance: date_naissance,
                email: email,
                mot_de_passe: hashedPassword,
                classesid: classesid
           }
        });
    },
    deleteEleves: async ({id}) => {
        return await prisma.eleves.delete({
            where: {
                id: id,
            },
        });
    },
    updateEleves: async ({num_etudiant, nom, penom, date_naissance, email, mot_de_passe, classesid}) => {
        await prisma.eleves.update({
            where: {
                id: id,
            },
            data: {
                num_etudiant: num_etudiant,
                nom: nom,
                penom: penom,
                date_naissance: date_naissance,
                email: email,
                mot_de_passe: mot_de_passe,
                classesid: classesid
            }
        });
    },
    
    // Eleves_controlles
    getEleves_controlles: async () => {
        return await prisma.eleves_controlles.findMany();
    },
    getEleves_controllesById: async ({id}) => {
        return await prisma.eleves_controlles.findUnique({
            where: {
              id: id,
            },
        });
    },
    createEleves_controlles: async ({elevesid, controllesid, note}) => {
        return await prisma.eleves_controlles.create({
            data: {
                elevesid: elevesid,
                controllesid: controllesid,
                note: note
           }
        });
    },
    deleteEleves_controlles: async ({id}) => {
        return await prisma.eleves_controlles.delete({
            where: {
                id: id,
            },
        });
    },
    updateEleves_controlles: async ({elevesid, controllesid, note}) => {
        await prisma.eleves_controlles.update({
            where: {
                elevesid: elevesid,
                controllesid: controllesid
            },
            data: {
                note: note
            }
        });
    },
    
    // FORMATEURS
    getFormateurs: async () => {
        return await prisma.formateurs.findMany();
    },
    getFormateursById: async ({id}) => {
        return await prisma.formateurs.findUnique({
            where: {
              id: id,
            },
        });
    },
    createFormateurs: async ({num_formateur, nom, prenom, email, mot_de_passe, cv}) => {
        const plainPassword = '';
        const hashedPassword = await hashPassword(plainPassword);
            console.log(mot_de_passe);
        return await prisma.formateurs.create({
            data: {
                num_formateur: num_formateur,
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashedPassword,
                cv: cv
            }
          })
          
    },
    deleteFormateurs: async ({id}) => {
        return await prisma.formateurs.delete({
            where: {
                id: id,
            },
        });
    },
    updateFormateurs: async ({num_formateur, nom, prenom, email, mot_de_passe, cv}) => {
        await prisma.formateurs.update({
            where: {
                id: id,
            },
            data: {
                num_formateur: num_formateur,
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: mot_de_passe,
                cv: cv
            }
        });
    },
    
    // MATIERES
    getMatieres: async () => {
        return await prisma.matieres.findMany();
    },
    getMatieresById: async ({id}) => {
        return await prisma.matieres.findUnique({
            where: {
              id: id,
            },
        });
    },
    createMatieres: async ({intitule, description, objectifs, prerequis, temps}) => {
        return await prisma.matieres.create({
            data: {
            intitule: intitule,
            description: description,
            objectifs: objectifs,
            prerequis: prerequis,
            temps: temps
           }
        });
    },
    deleteMatieres: async ({id}) => {
        return await prisma.matieres.delete({
            where: {
                id: id,
            },
        });
    },
    updateMatieres: async ({intitule, description, objectifs, prerequis, temps}) => {
        await prisma.matieres.update({
            where: {
                id: id,
            },
            data: {
                intitule: intitule,
                description: description,
                objectifs: objectifs,
                prerequis: prerequis,
                temps: temps
            }
        });
    },
    
    // MATIERES_PARCOURS
    getMatieres_parcours: async () => {
        return await prisma.matieres_parcours.findMany();
    },
    getMatieres_parcoursById: async ({id}) => {
        return await prisma.matieres_parcours.findUnique({
            where: {
              id: id,
            },
        });
    },
    createMatieres_parcours: async ({matieresid, parcoursid}) => {
        return await prisma.matieres_parcours.create({
            data: {
            matieresid: matieresid,
            parcoursid: parcoursid
           }
        });
    },
    deleteMatieres_parcours: async ({id}) => {
        return await prisma.matieres_parcours.delete({
            where: {
                id: id,
            },
        });
    },
    updateMatieres_parcours: async ({matieresid, parcoursid}) => {
        await prisma.matieres_parcours.update({
            where: {
                matieresid: matieresid,
                parcoursid: parcoursid
            },
            data: {
                matieresid: matieresid,
                parcoursid: parcoursid
            }
        });
    },
        
    // RESERVER_SALLE_CLASSES
    getReserver_salle_classes: async () => {
        return await prisma.reserver_salle_classes.findMany();
    },
    getReserver_salle_classesById: async ({id}) => {
        return await prisma.reserver_salle_classes.findUnique({
            where: {
              id: id,
            },
        });
    },
    createReserver_salle_classes: async ({salle_classesid, classesid, date, heure_debut, heure_fin}) => {
        return await prisma.reserver_salle_classes.create({
            data: {
            salle_classesid: salle_classesid,
            classesid: classesid,
            date: date,
            heure_debut: heure_debut,
            heure_fin: heure_fin
           }
        });
    },
    deleteReserver_salle_classes: async ({id}) => {
        return await prisma.reserver_salle_classes.delete({
            where: {
                id: id,
            },
        });
    },
    updateReserver_salle_classes: async ({salle_classesid, classesid, date, heure_debut, heure_fin}) => {
        await prisma.reserver_salle_classes.update({
            where: {
                salle_classesid: salle_classesid,
                classesid: classesid
            },
            data: {
                classesid: classesid,
                date: date,
                heure_debut: heure_debut,
                heure_fin: heure_fin
            }
        });
    },

    // SALLES_CLASSES
    getSalle_classes: async () => {
        return await prisma.salle_classes.findMany();
    },
    getSalle_classesById: async ({id}) => {
        return await prisma.salle_classes.findUnique({
            where: {
              id: id,
            },
        });
    },
    createSalle_classes: async ({nom, taille, est_disponible}) => {
        return await prisma.salle_classes.create({
            data: {
            nom: nom,
            taille: taille,
            est_disponible: est_disponible,
           }
        });
    },
    deleteSalle_classes: async ({id}) => {
        return await prisma.salle_classes.delete({
            where: {
                id: id,
            },
        });
    },
    updateSalle_classes: async ({nom, taille, est_disponible, outilsid}) => {
        await prisma.salle_classes.update({
            where: {
                id: id,
            },
            data: {
                nom: nom,
                taille: taille,
                est_disponible: est_disponible,
                outilsid: outilsid
            }
        });
    },    
}


app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
app.listen(4200);
console.log('Running a GraphQL API server at http://localhost:4200/graphql');