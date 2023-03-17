const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const prisma = require('./prisma')
require('dotenv').config()

const app = express()

const schema = buildSchema(`
type Query {
  department(id: Int!): Department
  departments: [Department!]!
  course(id: Int!): Course
  courses: [Course!]!
  class(id: Int!): Class
  classes: [Class!]!
  student(id: Int!): Student
  students: [Student!]!
  trainer(id: Int!): Trainer
  trainers: [Trainer!]!
  grade(id: Int!): Grade
  grades: [Grade!]!
  address(id: Int!): Address
  addresses: [Address!]!
}
type Department {
  id: ID!
  name: String!
  courses: [Course!]!
}

type Course {
  id: ID!
  name: String!
  code: String!
  department: Department!
}

type Class {
  id: ID!
  name: String!
  startTime: String!
  endTime: String!
  course: Course!
  students: [Student!]!
  trainer: Trainer!
}

type Student {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  classes: [Class!]!
  grades: [Grade!]!
  address: Address!
}

type Trainer {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  classes: [Class!]!
  address: Address!
}

type Grade {
  id: ID!
  value: Int!
  student: Student!
  class: Class!
}

type Address {
  id: ID!
  street: String!
  city: String!
  state: String!
  zip: String!
  students: [Student!]!
  trainers: [Trainer!]!
}

type Mutation {
  createDepartment(data: CreateDepartmentInput!): Department!
  updateDepartment(id: Int!, data: UpdateDepartmentInput!): Department!
  deleteDepartment(id: Int!): Department!

  createCourse(data: CreateCourseInput!): Course!
  updateCourse(id: Int!, data: UpdateCourseInput!): Course!
  deleteCourse(id: Int!): Course!

  createClass(data: CreateClassInput!): Class!
  updateClass(id: Int!, data: UpdateClassInput!): Class!
  deleteClass(id: Int!): Class!

  createStudent(data: CreateStudentInput!): Student!
  updateStudent(id: Int!, data: UpdateStudentInput!): Student!
  deleteStudent(id: Int!): Student!

  createTrainer(data: CreateTrainerInput!): Trainer!
  updateTrainer(id: Int!, data: UpdateTrainerInput!): Trainer!
  deleteTrainer(id: Int!): Trainer!

  createGrade(data: CreateGradeInput!): Grade!
  updateGrade(id: Int!, data: UpdateGradeInput!): Grade!
  deleteGrade(id: Int!): Grade!

  createAddress(data: CreateAddressInput!): Address!
  updateAddress(id: Int!, data: UpdateAddressInput!): Address!
  deleteAddress(id: Int!): Address!
}
 
input CreateDepartmentInput {
  name: String!
  addressId: Int
}

input UpdateDepartmentInput {
  name: String
  addressId: Int
}

input CreateCourseInput {
  name: String!
  code: String!
  description: String
  start_date: DateTime
  end_date: DateTime
  department_id: Int!
}

input UpdateCourseInput {
  name: String
  code: String
  description: String
  start_date: DateTime
  end_date: DateTime
  department_id: Int
}

input CreateClassInput {
  name: String!
  code: String!
  description: String
  start_date: DateTime
  end_date: DateTime
  course_id: Int!
}

input UpdateClassInput {
  name: String
  code: String
  description: String
  start_date: DateTime
  end_date: DateTime
  course_id: Int
}

input CreateStudentInput {
  first_name: String!
  last_name: String!
  email: String
  phone: String
  website: String
  address_id: Int
}

input UpdateStudentInput {
  first_name: String
  last_name: String
  email: String
  phone: String
  website: String
  address_id: Int
}

input CreateTrainerInput {
  first_name: String!
  last_name: String!
  email: String
  phone: String
  website: String
  department_id: Int!
}

input UpdateTrainerInput {
  first_name: String
  last_name: String
  email: String
  phone: String
  website: String
  department_id: Int
}

 

 

 


  
`)

const root = {

  departments: async () => {
    return await prisma.department.findMany();
  },
  // Fetch a department by ID
  department: async (_, { id }) => {
    return await prisma.department.findUnique({
      where: { id },
    });
  },
  // Fetch all courses
  courses: async () => {
    return await prisma.course.findMany();
  },
  // Fetch a course by ID
  course: async (_, { id }) => {
    return await prisma.course.findUnique({
      where: { id },
    });
  },
  // Fetch all classes
  classes: async () => {
    return await prisma.class.findMany();
  },
  // Fetch a class by ID
  class: async (_, { id }) => {
    return await prisma.class.findUnique({
      where: { id },
    });
  },
  // Fetch all students
  students: async () => {
    return await prisma.student.findMany();
  },
  // Fetch a student by ID
  student: async (_, { id }) => {
    return await prisma.student.findUnique({
      where: { id },
    });
  },
  // Fetch all trainers
  trainers: async () => {
    return await prisma.trainer.findMany();
  },
  // Fetch a trainer by ID
  trainer: async (_, { id }) => {
    return await prisma.trainer.findUnique({
      where: { id },
    });
  },
  // Fetch all grades
  grades: async () => {
    return await prisma.grade.findMany();
  },
  // Fetch a grade by ID
  grade: async (_, { id }) => {
    return await prisma.grade.findUnique({
      where: { id },
    });
  },
  // Fetch all addresses
  addresses: async () => {
    return await prisma.address.findMany();
  },
  // Fetch an address by ID
  address: async (_, { id }) => {
    return await prisma.address.findUnique({
      where: { id },
    });
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
