const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const prisma = require('./prisma')
require('dotenv').config()

const app = express()

const schema = buildSchema(`
# schema.graphql

type Query {
  # Query fields go here
  students: [Student!]!
  student(id: Int!): Student
  grade(id: Int!): Grade
  Grades: [Grade!]!  
  departments: [Department!]!
  department(id: Int!): Department
  addresses: [Address!]!
  address(id: Int!): Address
  courses: [Course!]!
  course(id: Int!): Course
  classes: [Class!]!
  class(id: Int!): Class

  
  
}

type Mutation {
  # Mutation fields go here
  createStudent(
    id: Int!
    first_name: String!
    last_name: String!
    email: String
    phone: String
    website: String
    address_id: Int
  ): Student!
  updateStudent(id: Int!
    first_name: String!
    last_name: String!
    email: String
    phone: String
    website: String
    address_id: Int): Student!
  deleteStudent(id: Int!): Student

  createGrade(
    value: Float!
    description: String
    studentId: Int!
    classId: Int!
  ): Grade!
  
  updateGrade(
    id: Int!
    value: Float
    description: String
    studentId: Int
    classId: Int
  ): Grade!
  
  deleteGrade(id: Int!): Grade

  createDepartment(name: String!, addressId: Int): Department!
  updateDepartment(id: Int!, name: String, addressId: Int): Department!
  deleteDepartment(id: Int!): Department

  createAddress(street: String!, city: String!, state: String!, zipCode: String!, country: String!): Address!
  updateAddress(id: Int!, street: String, city: String, state: String, zipCode: String, country: String): Address!
  deleteAddress(id: Int!): Address

  createCourse(name: String!, code: String!, description: String, startDate: DateTime, endDate: DateTime, departmentId: Int!): Course!
  updateCourse(id: Int!, name: String, code: String, description: String, startDate: DateTime, endDate: DateTime, departmentId: Int): Course!
  deleteCourse(id: Int!): Course

  createClass(name: String!, code: String!, description: String, startDate: DateTime, endDate: DateTime, courseId: Int!): Class!
  updateClass(id: Int!, name: String, code: String, description: String, startDate: DateTime, endDate: DateTime, courseId: Int): Class!
  deleteClass(id: Int!): Class
  
}

type Course {
  id: Int!
  name: String!
  code: String!
  description: String
  start_date: DateTime
  end_date: DateTime
  department: Department!
  department_id: Int!
  classes: [Class!]!
  created_at: DateTime!
  updated_at: DateTime!
}

type Department {
  id: Int!
  name: String!
  addressId: Int
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
  course_id: Int!
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
  address_id: Int
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
  department_id: Int!
  created_at: DateTime!
  updated_at: DateTime!
}

type Grade {
  id: Int!
  value: Float!
  description: String
  student: Student!
  student_id: Int!
  class: Class!
  class_id: Int!
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

`)

const root = {
  
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
