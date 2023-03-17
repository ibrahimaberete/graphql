import express from "express"
import { readFile } from "fs/promises"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"

const app = express()

app.use(express.json())

let value = JSON.parse(await readFile("./eleve2.json"))

let eleves = value.eleves
let classes = value.classes

const generateTab = () => {
    let tab = []
    eleves.forEach(element => {
        let obj = element
        let c = classes.find((e) => {
            return e.id == element.classe
        })
        obj.classe = c
        tab.push(obj)
    })
    return tab
} 

let tabFinal = generateTab()

let schema = buildSchema(`
    type Classe{
        id: ID!
        name: String
        groupe: Int
        promo: String
    }

    type Eleve{
        id: ID!
        lastname: String!
        firstname: String!
        classe: String!
    }

    type Query{
        getEleves : [Eleve]
        getElevesById(id: Int!) : Eleve!
        getClasses : [Classe]
    }

    type Mutation{
        addEleves(lastname:String!, lastname:String!, classe:Int!) : String!
        addClasse(name:String!, promo:String!, groupe:Int!) : [Classe]
        deleteClasses(id:Int!) : [Classe]

        updateClasses(id:Int, name:String, promo:String, groupe:Int) : [Classe]
        updateEleves(id:Int, lastname:String, firstname:String, classe:Int) : [Eleve]
        deleteEleves(id:Int!) : [Eleve]
    }
`)

let root = {
    getEleves : () => {
        //eleves.forEach(element => {
        //    let c = classes.find((e) => {
        //        return e.id == element.classe
        //    })
        //    element.classe = c
        //})
        //return eleves
        return eleves
    },
    getElevesTabFinal : () => {
        return tabFinal
    },
    getClasses : () => {
        return classes
    },
    getElevesById : () => {
        //ou tabFinal ça marche aussi
        return value.eleves.find((e) => {
            return e.id == id
        })
    },
    addEleves : ({lastname, firstname, classe}) => {
        if (classe =! null){
            let c = classes.find((e) => {
                return e.id == classe
            })
            if (c !== undefined) {
                tabFinal.push(
                    {
                        "id": eleves.length,
                        "firstname": firstname,
                        "lastname": lastname,
                        "classe": c
                    }
                )
                return "Eleve ajouté" 
            }
            else 
            {
                return "La classe pour id "+ classe +" n'existe pas!"
            }
        }
        return "Veuillez entrer une valeur pour classe !"

        //eleves.push({
        //    "id": value.eleves.length,
        //    "lastname": lastname,
        //    "firstname": firstname,
        //    "classe": classe
        //})
        //return value.eleves.length-1
    },
    addClasse : ({name, promo, groupe}) => {
        let c = classes.find((e) => {
            return e.name = name && e.promo == promo && e.groupe == groupe
        })
        if (c === undefined) {
            classes.push({
                "id": classes.length,
                "name": name,
                "promo": promo,
                "groupe": groupe
            })
            return classes
        }
        return null
    },
    updateEleves : ({id, lastname, firstname, classe}) => {
        let getId = eleves.find((e) => {
            return e.id == id
        })
        if (lastname != null){
            eleves[getId.id].lastname = lastname
        }
        if (firstname != null){
            eleves[getId.id].firstname = firstname
        }
        if (classe != null){
            let getIdClasse = classes.find((e) => {
                return e.id == classe
            })
            if (getIdClasse !== undefined) {
                eleves[getId.id].classe = getIdClasse
            } else {
                return "Classe n'existe pas !"
            }
            //eleves[getId.id].classe = classe
        }
        return value.eleves
    },
    updateClasses : ({id, name, promo, groupe}) => {
        let getId = classes.find((e) => {
            return e.id == id
        })
        if (name != null) {
            classes[getId.id].name = name
        }
        if (groupe != null) {
            classes[getId.id].groupe = groupe
        }
        if (promo != null) {
            classes[getId.id].promo = promo
        }
        return classes
    },
    deleteEleves : ({id}) => {
        let getId = value.eleves.find((e) => {
            return e.id == id
        })
        delete value.eleves[getId.id]
        delete tabFinal[getId.id]
        return value.eleves
    },
    deleteClasses : ({id}) => {
        let getId = classes.find((e) => {
            return e.id == id
        })
        delete classes[getId.id]
        eleves.forEach((element) => {
            if(element.classe.id == id) {
                element.classe = null
            }
        })
        //delete tabFinal[getId.id]
        return classes
    }
}

app.use("gql", graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true
}))

app.listen(3000)