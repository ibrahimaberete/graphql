// import express from "express";
// import graphql from "express-graphql";
// import {graphqlHTTP} from "express-graphql";
// import {buildSchema} from "graphql";

// // const { PrismaClient } = require('@prisma/client')
// import prismaClient from "prisma/client";
const express = require("express");
// const app = express();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient()

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

var schema = buildSchema(`
        type editors{  idEditors:Int!  nameEditors:String, games:games}
        type games{ idGames:Int! nameGames:String, idEditors:Int! stock:stock }
        type stock{ idStock:Int! , idGames:Int!, idSort:Int!, units: Int, games:games, stores:games}
        type stores{ idStore:Int! nameStore:String, stock:stock }
        type Query{    getEditors : [editors]
                        getGames : [games]
                        getStock : [stock]
                        getStore : [stores]
        }
        input EditorsCreateInput {
            nameEditors: String!
          }
        type Mutation {
  createEditors(nameEditors: String!): editors!  
  updateEditors(idEditors: Int!, nameEditors: String): editors!
  deleteEditors(idEditors: Int!): editors!
  
  createGames(nameGames: String!, idEditors: Int!): games!
  updateGames(idGames: Int!, nameGames: String, idEditors: Int): games!
  deleteGames(idGames: Int!): games!
  
  createStock(idGames: Int!, idStores: Int!, units: Int!): stock!
  updateStock(idStock: Int!, idGames: Int, idStores: Int, units: Int): stock!
  deleteStock(idStock: Int!): stock!
  
  createStores(nameStores: String!): stores!
  updateStores(idStores: Int!, nameStores: String): stores!
  deleteStores(idStores: Int!): stores!
}

    `);
var root = {
  getEditors: async () => {
    return await prisma.editors.findMany();
  },
  getGames: async () => {
    return await prisma.games.findMany();
  },
  getStock: async () => {
    return await prisma.games.findMany();
  },
  getStore: async () => {
    return await prisma.games.findMany();
  },

//   createCours: async ({intitule, description, contenu, matieresid, formateursid}) => {
//     return await prisma.cours.create({
//         data: {
//             intitule: intitule,
//             description: description,
//             contenu: contenu,
//             matieresid: matieresid,
//             formateursid: formateursid
//        }
//     });
    createEditors: async ({nameEditors}) => {
        return await prisma.editors.create({
            data: {nameEditors: nameEditors}})
},


  



};
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4302);
console.log("Running a GraphQL API server at http://localhost:4302/graphql");
