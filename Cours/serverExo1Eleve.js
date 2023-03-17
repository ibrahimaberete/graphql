import express from "express"
import { readFile } from "fs/promises"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"

const app = express()

app.use(express.json())

let value = JSON.parse(await readFile("./eleve.json"))

let schema = buildSchema(`
    type Eleve{
        id: ID!
        lastname: String!
        firstname: String!
        classe: String!
    }

    type Query{
        getEleves : [Eleve]
        getElevesById(id: Int!) :Eleve!
    }

    type Mutation{
        addEleves(lastname:String!, lastname:String!, classe:String!) : Int!
        updateEleves(id:Int, lastname:String, firstname:String, classe:String) : [Eleve]
        deleteEleves(id:Int!) : [Eleve]
    }
`)

let root = {
    getEleves : () => {
        return value.eleves
    },
    getElevesById : () => {
        return value.eleves.find((e) => {
            return e.id == id
        })
    },
    addEleves : ({lastname, firstname, classe}) => {
        value.eleves.push({
            "id": value.eleves.length,
            "lastname": lastname,
            "firstname": firstname,
            "classe": classe
        })
        return value.eleves.length-1
    },
    updateEleves : ({id, lastname, firstname, classe}) => {
        let getId = value.eleves.find((e) => {
            return e.id == id
        })
        if (lastname != null){
            value.eleves[getId.id].lastname = lastname
        }
        if (firstname != null){
            value.eleves[getId.id].firstname = firstname
        }
        if (classe != null){
            value.eleves[getId.id].classe = classe
        }
        return value.eleves
    },
    deleteEleves : ({id}) => {
        let getId = value.eleves.find((e) => {
            return e.id == id
        })
        delete value.eleves[getId.id]
        return value.eleves
    }
}

app.use("gql", graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true
}))

app.listen(3000)