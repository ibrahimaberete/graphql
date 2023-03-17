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
            name: String!
            promotion: Int!
            trainingid: Int!
        }

        type Exams {
            id: Int!
            date: Date!
            temps: Int!
            contenu: String!
            materialsid: Int!
            trainersid: Int!
        }

        type Course {
            id: Int!
            intitule: String!
            description: String!
            contenu: String!
            materialsid: Int!
            trainersid: Int!
        }

        type Studiant {
            id: Int!
            num_etudiant: Int!
            nom: String!
            prenom: String!
            date_naissance: Date!
            email: String!
            mot_de_passe: String!
            classesid: Int!
        }

        type Studiant_exams {
            studiantid: Int!
            examsid: Int!
            note: Int!
        }

        type Trainers {
            id: Int!
            num_trainer: Int!
            nom: String!
            prenom: String!
            email: String!
            mot_de_passe: String!
            cv: String!
        }

        type Materials {
            id: Int!
            intitule: String!
            description: String!
            objectifs: String!
            prerequis: String!
            temps: Int!
        }

        type Materials_training {
            materialsid: Int!
            trainingid: Int!
        }

        type Training {
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
            getExams: [Exams]
            getCourse: [Course]
            getStudiant: [Studiant]
            getStudiant_exams: [Studiant_exams]
            getTrainers: [Trainers]
            getMaterials: [Materials]
            getMaterials_training: [Materials_training]
            getTraining: [Training]
            getReserver_salle_classes: [Reserver_salle_classes]
            getSalle_classes: [Salle_classes]

            getClassesById(id: Int): Classes
            getExamsById(id: Int): Exams
            getCourseById(id: Int): Course
            getStudiantById(id: Int): Studiant
            getStudiant_examsById(id: Int): Studiant_exams
            getTrainersById(id: Int): Trainers
            getMaterialsById(id: Int): Materials
            getMaterials_trainingById(id: Int): Materials_training
            getTrainingById(id: Int): Training
            getReserver_salle_classesById(id: Int): Reserver_salle_classes
            getSalle_classesById(id: Int): Salle_classes
        }
        
        type Mutation {
            createClasses(name: String, promotion: Int, trainingid: Int): Classes
            createExams(date: Date, temps: Int, contenu: String, materialsid: Int, trainersid: Int): Exams
            createCourse(intitule: String,description: String,contenu: String,materialsid: Int,trainersid: Int): Course
            createStudiant(num_etudiant: Int,nom: String,prenom: String,date_naissance: Date,email: String,mot_de_passe: String,classesid: Int): Studiant
            createStudiant_exams(studiantid: Int,examsid: Int,note: Int): Studiant_exams
            createTrainers(num_trainer: Int,nom: String,prenom: String,email: String,mot_de_passe: String,cv: String): Trainers
            createMaterials(intitule: String,description: String,objectifs: String,prerequis: String,temps: Int): Materials
            createMaterials_training(materialsid: Int, trainingid: Int): Materials_training
            createTraining(intitule: String,description: String,objectifs: String,deboucher: String): Training
            createReserver_salle_classes(salle_classesid: Int,classesid: Int,date: Date,heure_debut: Int,heure_fin: Int): Reserver_salle_classes
            createSalle_classes(nom: String,taille: Int,est_disponible: Boolean): Salle_classes

            deleteClasses(id: Int): Classes
            deleteExams(id: Int): Exams
            deleteCourse(id: Int): Course
            deleteStudiant(id: Int): Studiant
            deleteStudiant_exams(id: Int): Studiant_exams
            deleteTrainers(id: Int): Trainers
            deleteMaterials(id: Int): Materials
            deleteMaterials_training(id: Int): Materials_training
            deleteTraining(id: Int): Training
            deleteReserver_salle_classes(id: Int): Reserver_salle_classes
            deleteSalle_classes(id: Int): Salle_classes

            updateClasses(id: Int, name: String, promotion: Int, trainingid: Int): Classes
            updateExams(id: Int, date: Date, temps: Int, contenu: String, materialsid: Int, trainersid: Int): Exams
            updateCourse(id: Int, intitule: String,description: String,contenu: String,materialsid: Int,trainersid: Int): Course
            updateStudiant(id: Int, num_etudiant: Int,nom: String,prenom: String,date_naissance: Date,email: String,mot_de_passe: String,classesid: Int): Studiant
            updateStudiant_exams(studiantid: Int,examsid: Int,note: Int): Studiant_exams
            updateTrainers(id: Int, num_trainer: Int,nom: String,prenom: String,email: String,mot_de_passe: String,cv: String): Trainers
            updateMaterials(id: Int, intitule: String,description: String,objectifs: String,prerequis: String,temps: Int): Materials
            updateMaterials_training(materialsid: Int, trainingid: Int): Materials_training
            updateTraining(id: Int,description: String,objectifs: String,deboucher: String): Training
            updateReserver_salle_classes(salle_classesid: Int,classesid: Int,date: Date,heure_debut: Int,heure_fin: Int): Reserver_salle_classes
            updateSalle_classes(id: Int, nom: String,taille: Int,est_disponible: Boolean): Salle_classes
        }
    `
);

let root = { 
    // PARCOURS
    getTraining: async () => {
        return await prisma.training.findMany();
    },
    getTrainingById: async ({id}) => {
        return await prisma.training.findUnique({
            where: {
              id: id,
            },
        });
    },
    createTraining: async ({intitule, description, objectifs, deboucher}) => {
        return await prisma.training.create({
        data: {
            intitule: intitule,
            description: description,
            objectifs: objectifs,
            deboucher: deboucher
           }
        });
    },
    deleteTraining: async ({id}) => {
        return await prisma.training.delete({
            where: {
                id: id,
            },
        });
    },
    updateTraining: async ({id, intitule, description, objectifs, deboucher}) => {
        await prisma.training.update({
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
    createClasses: async ({name, promotion, trainingid}) => {
        return await prisma.classes.create({
            data: {
                name: name,
                promotion: promotion,
                trainingid: trainingid
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
    updateClasses: async ({id, name, promotion, trainingid}) => {
        await prisma.classes.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                promotion: promotion,
                trainingid: trainingid
            }
        });
    },
    
    // CONTROLLES
    getExams: async () => {
        return await prisma.exams.findMany();
    },
    getExamsById: async ({id}) => {
        return await prisma.exams.findUnique({
            where: {
              id: id,
            },
        });
    },
    createExams: async ({date, temps, contenu, materialsid, trainersid}) => {
        return await prisma.exams.create({
            data: {
                date: date,
                temps: temps,
                contenu: contenu,
                materialsid: materialsid,
                trainersid: trainersid
           }
        });
    },
    deleteExams: async ({id}) => {
        return await prisma.exams.delete({
            where: {
                id: id,
            },
        });
    },
    updateExams: async ({id, date, temp, contenu, materialsid, trainersid}) => {
        await prisma.exams.update({
            where: {
                id: id,
            },
            data: {
                date: date,
                temp: temp,
                contenu: contenu,
                materialsid: materialsid,
                trainersid: trainersid
            }
        });
    },
    
    // COURS
    getCourse: async () => {
        return await prisma.course.findMany();
    },
    getCourseById: async ({id}) => {
        return await prisma.course.findUnique({
            where: {
              id: id,
            },
        });
    },
    createCourse: async ({intitule, description, contenu, materialsid, trainersid}) => {
        return await prisma.course.create({
            data: {
                intitule: intitule,
                description: description,
                contenu: contenu,
                materialsid: materialsid,
                trainersid: trainersid
           }
        });
    },
    deleteCourse: async ({id}) => {
        return await prisma.course.delete({
            where: {
                id: id,
            },
        });
    },
    updateCourse: async ({intitule, description, contenu, materialsid, trainersid}) => {
        await prisma.course.update({
            where: {
                id: id,
            },
            data: {
                intitule: intitule,
                description: description,
                contenu: contenu,
                materialsid: materialsid,
                trainersid: trainersid
            }
        });
    },
    
    // ELEVES
    getStudiant: async () => {
        return await prisma.studiant.findMany();
    },
    getStudiantById: async ({id}) => {
        return await prisma.studiant.findUnique({
            where: {
              id: id,
            },
        });
    },
    createStudiant: async ({num_etudiant, nom, prenom, date_naissance, email, mot_de_passe, classesid}) => {
        const plainPassword = '';
        const hashedPassword = await hashPassword(plainPassword);
            console.log(mot_de_passe);
        return await prisma.studiant.create({
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
    deleteStudiant: async ({id}) => {
        return await prisma.studiant.delete({
            where: {
                id: id,
            },
        });
    },
    updateStudiant: async ({num_etudiant, nom, penom, date_naissance, email, mot_de_passe, classesid}) => {
        await prisma.studiant.update({
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
    
    // Studiant_exams
    getStudiant_exams: async () => {
        return await prisma.studiant_exams.findMany();
    },
    getStudiant_examsById: async ({id}) => {
        return await prisma.studiant_exams.findUnique({
            where: {
              id: id,
            },
        });
    },
    createStudiant_exams: async ({studiantid, examsid, note}) => {
        return await prisma.studiant_exams.create({
            data: {
                studiantid: studiantid,
                examsid: examsid,
                note: note
           }
        });
    },
    deleteStudiant_exams: async ({id}) => {
        return await prisma.studiant_exams.delete({
            where: {
                id: id,
            },
        });
    },
    updateStudiant_exams: async ({studiantid, examsid, note}) => {
        await prisma.studiant_exams.update({
            where: {
                studiantid: studiantid,
                examsid: examsid
            },
            data: {
                note: note
            }
        });
    },
    
    // FORMATEURS
    getTrainers: async () => {
        return await prisma.trainers.findMany();
    },
    getTrainersById: async ({id}) => {
        return await prisma.trainers.findUnique({
            where: {
              id: id,
            },
        });
    },
    createTrainers: async ({num_trainer, nom, prenom, email, mot_de_passe, cv}) => {
        const plainPassword = '';
        const hashedPassword = await hashPassword(plainPassword);
            console.log(mot_de_passe);
        return await prisma.trainers.create({
            data: {
                num_trainer: num_trainer,
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashedPassword,
                cv: cv
            }
          })
          
    },
    deleteTrainers: async ({id}) => {
        return await prisma.trainers.delete({
            where: {
                id: id,
            },
        });
    },
    updateTrainers: async ({num_trainer, nom, prenom, email, mot_de_passe, cv}) => {
        await prisma.trainers.update({
            where: {
                id: id,
            },
            data: {
                num_trainer: num_trainer,
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: mot_de_passe,
                cv: cv
            }
        });
    },
    
    // materials
    getMaterials: async () => {
        return await prisma.materials.findMany();
    },
    getMaterialsById: async ({id}) => {
        return await prisma.materials.findUnique({
            where: {
              id: id,
            },
        });
    },
    createMaterials: async ({intitule, description, objectifs, prerequis, temps}) => {
        return await prisma.materials.create({
            data: {
            intitule: intitule,
            description: description,
            objectifs: objectifs,
            prerequis: prerequis,
            temps: temps
           }
        });
    },
    deleteMaterials: async ({id}) => {
        return await prisma.materials.delete({
            where: {
                id: id,
            },
        });
    },
    updateMaterials: async ({intitule, description, objectifs, prerequis, temps}) => {
        await prisma.materials.update({
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
    
    // materials_PARCOURS
    getMaterials_training: async () => {
        return await prisma.materials_training.findMany();
    },
    getMaterials_trainingById: async ({id}) => {
        return await prisma.materials_training.findUnique({
            where: {
              id: id,
            },
        });
    },
    createMaterials_training: async ({materialsid, trainingid}) => {
        return await prisma.materials_training.create({
            data: {
            materialsid: materialsid,
            trainingid: trainingid
           }
        });
    },
    deleteMaterials_training: async ({id}) => {
        return await prisma.materials_training.delete({
            where: {
                id: id,
            },
        });
    },
    updateMaterials_training: async ({materialsid, trainingid}) => {
        await prisma.materials_training.update({
            where: {
                materialsid: materialsid,
                trainingid: trainingid
            },
            data: {
                materialsid: materialsid,
                trainingid: trainingid
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
app.listen(4201);
console.log('Running a GraphQL API server at http://localhost:4200/graphql');