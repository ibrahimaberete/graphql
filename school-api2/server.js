const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const prisma = require('./prisma')
require('dotenv').config()

const app = express()

const schema = buildSchema(`
type Course {
  id: Int!
  name: String!
  code: String!
  description: String
  start_date: DateTime
  end_date: DateTime
  department: Department!
  classes: [Class!]!
  created_at: DateTime!
  updated_at: DateTime!
}

type Department {
  id: Int!
  name: String!
  address: Address
  courses: [Course!]!
  trainers: [Trainer!]!
  created_at: DateTime!
}

type Class {
  id: Int!
  name: String!
  code: String!
  description: String
  start_date: DateTime
  end_date: DateTime
  course: Course!
  students: [Student!]!
  grades: [Grade!]!
  created_at: DateTime!
  updated_at: DateTime!
}

type Student {
  id: Int!
  first_name: String!
  last_name: String!
  email: String
  phone: String
  website: String
  address: Address
  classes: [Class!]!
  grades: [Grade!]!
  created_at: DateTime!
  updated_at: DateTime!
}

type Trainer {
  id: Int!
  first_name: String!
  last_name: String!
  email: String
  phone: String
  website: String
  department: Department!
  created_at: DateTime!
  updated_at: DateTime!
}

type Grade {
  id: Int!
  value: Float!
  description: String
  student: Student!
  class: Class!
  created_at: DateTime!
  updated_at: DateTime!
}

type Address {
  id: Int!
  street: String!
  city: String!
  state: String!
  zip_code: String!
  country: String!
  created_at: DateTime!
  updated_at: DateTime!
  departments: [Department!]!
  students: [Student!]!
}

type Query {
  course(id: Int!): Course
  courses: [Course!]!
  department(id: Int!): Department
  departments: [Department!]!
  class(id: Int!): Class
  classes: [Class!]!
  student(id: Int!): Student
  students: [Student!]!
  trainer(id: Int!): Trainer
  trainers: [Trainer!]!
  grade(id: Int!): Grade
  grades: [Grade!]!
}

type Mutation {
  createCourse(name: String!, code: String!, department_id: Int!): Course!
  updateCourse(id: Int!, name: String, code: String, description: String, start_date: DateTime, end_date: DateTime, department_id: Int): Course!
  deleteCourse(id: Int!): Course
  createDepartment(name: String!, address_id: Int): Department!
  updateDepartment(id: Int!, name: String, address_id: Int): Department!
  deleteDepartment(id: Int!): Department
  createClass(name: String!, code: String!, course_id: Int!): Class!
  updateClass(id: Int!, name: String, code: String, description: String, start_date: DateTime, end_date: DateTime, course_id: Int): Class!
  deleteClass(id: Int!): Class
  createStudent(first_name: String!, last_name: String!): Student!
  updateStudent(id: Int!, first_name: String, last_name: String, email: String, phone: String, website: String, address_id: Int): Student!
  deleteStudent(id: Int!): Student
  createTrainer(first_name: String!, last_name: String!, email: String, phone: String, website: String, department_id: Int!): Trainer!
  updateTrainer(id: Int!, first_name: String, last_name: String, email: String, phone: String, website: String, department_id: Int): Trainer!
  deleteTrainer(id: Int!): Trainer
  createGrade(value: Float!, description: String, student_id: Int!, class_id: Int!): Grade!
  updateGrade(id: Int!, value: Float, description: String, student_id: Int, class_id: Int): Grade!
  deleteGrade(id: Int!): Grade
`)

const root = {
  Mutation: {
    createClass: async (_, { input }, { prisma }) => {
      const classResult = await prisma.class.create({ data: input });
      return classResult;
    },
    updateClass: async (_, { id, input }, { prisma }) => {
      const classResult = await prisma.class.update({
        where: { id },
        data: input,
      });
      return classResult;
    },
    deleteClass: async (_, { id }, { prisma }) => {
      const classResult = await prisma.class.delete({ where: { id } });
      return classResult;
    },
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`)
})
