const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const prisma = require('./prisma')
require('dotenv').config()

const app = express()

const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses: [Course]
    student(id: Int!): Student
    students: [Student]
    teacher(id: Int!): Teacher
    teachers: [Teacher]
    timetable(id: Int!): Timetable
    timetables: [Timetable]
    training(id: Int!): Training
    trainings: [Training]
  }

  type Mutation {
    createCourse(name: String!, trainingId: Int!, teacherId: Int!, timetableId: Int!, studentIds: [Int]): Course
    createStudent(name: String!, courseId: Int!): Student
    createTeacher(name: String!, courseIds: [Int]): Teacher
    createTimetable(days: String!, courseId: Int!): Timetable
    createTraining(courseType: String!): Training
  }

  type Course {
    id: Int
    name: String
    teacher: Teacher
    timetable: Timetable
    students: [Student]
    training: Training
  }

  type Student {
    id: Int
    name: String
    course: Course
  }

  type Teacher {
    id: Int
    name: String
    courses: [Course]
  }

  type Timetable {
    id: Int
    days: String
    course: Course
  }

  type Training {
    id: Int
    courseType: String
    courses: [Course]
  }
`)

const root = {
  Query: {
    courses: () => prisma.course.findMany(),
    course: (_, { id }) => prisma.course.findUnique({ where: { id } }),
    students: () => prisma.student.findMany(),
    student: (_, { id }) => prisma.student.findUnique({ where: { id } }),
    teachers: () => prisma.teacher.findMany(),
    teacher: (_, { id }) => prisma.teacher.findUnique({ where: { id } }),
    timetables: () => prisma.timetable.findMany(),
    timetable: (_, { id }) => prisma.timetable.findUnique({ where: { id } }),
    trainings: () => prisma.training.findMany(),
    training: (_, { id }) => prisma.training.findUnique({ where: { id } }),
    },
    Mutation: {
    createCourse: (_, args) => prisma.course.create({ data: args }),
    createStudent: (_, args) => prisma.student.create({ data: args }),
    createTeacher: (_, args) => prisma.teacher.create({ data: args }),
    createTimetable: (_, args) => prisma.timetable.create({ data: args }),
    createTraining: (_, args) => prisma.training.create({ data: args }),
    updateCourse: (_, args) => prisma.course.update({ where: { id: args.id }, data: args }),
    updateStudent: (, args) => prisma.student.update({ where: { id: args.id }, data: args }),
    updateTeacher: (, args) => prisma.teacher.update({ where: { id: args.id }, data: args }),
    updateTimetable: (, args) => prisma.timetable.update({ where: { id: args.id }, data: args }),
    updateTraining: (, args) => prisma.training.update({ where: { id: args.id }, data: args }),
    deleteCourse: (, { id }) => prisma.course.delete({ where: { id } }),
    deleteStudent: (, { id }) => prisma.student.delete({ where: { id } }),
    deleteTeacher: (, { id }) => prisma.teacher.delete({ where: { id } }),
    deleteTimetable: (, { id }) => prisma.timetable.delete({ where: { id } }),
    deleteTraining: (, { id }) => prisma.training.delete({ where: { id } }),
    },
    Course: {
    teacher: (parent) => prisma.course.findUnique({ where: { id: parent.id } }).teacher(),
    timetable: (parent) => prisma.course.findUnique({ where: { id: parent.id } }).timetable(),
    students: (parent) => prisma.course.findUnique({ where: { id: parent.id } }).students(),
    training: (parent) => prisma.course.findUnique({ where: { id: parent.id } }).training(),
    },
    Student: {
    course: (parent) => prisma.student.findUnique({ where: { id: parent.id } }).course(),
    },
    Teacher: {
    courses: (parent) => prisma.teacher.findUnique({ where: { id: parent.id } }).courses(),
    },
    Timetable: {
    course: (parent) => prisma.timetable.findUnique({ where: { id: parent.id } }).course(),
    },
    Training: {
    courses: (parent) => prisma.training.findUnique({ where: { id: parent.id } }).courses(),
    },
    }
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
