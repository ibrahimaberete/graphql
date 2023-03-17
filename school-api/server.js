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
  course: async ({ id }) => await prisma.course.findUnique({ where: { id } }),
  courses: async () => await prisma.course.findMany(),
  createCourse: async ({ name, trainingId, teacherId, timetableId, studentIds }) => {
    const course = await prisma.course.create({
      data: {
        name,
        training: { connect: { id: trainingId } },
        teacher: { connect: { id: teacherId } },
        timetable: { connect: { id: timetableId } },
        students: studentIds && { connect: studentIds.map((id) => ({ id })) },
      },
      include: {
        training: true,
        teacher: true,
        timetable: true,
        students: true,
      },
    })
    return course
  },
  student: async ({ id }) => await prisma.student.findUnique({ where: { id } }),
  students: async () => await prisma.student.findMany(),
  createStudent: async ({ name, courseId }) => {
    const student = await prisma.student.create({
      data: {
        name,
        course: { connect: { id: courseId } },
      },
      include: { course: true },
    })
    return student
  },
  teacher: async ({ id }) => await prisma.teacher.findUnique({ where: { id } }),
  teachers: async () => await prisma.teacher.findMany(),
  createTeacher: async ({ name, courseIds }) => {
    const teacher = await prisma.teacher.create({
      data: {
        name,
        courses: courseIds && { connect: courseIds.map((id) => ({ id })) },
      },
      include:
      {courses: true},
    })
    return teacher
  },
  timetable: async ({ id }) => await prisma.timetable.findUnique({ where: { id } }),
  timetables: async () => await prisma.timetable.findMany(),
  createTimetable: async ({ days, courseId }) => {
    const timetable = await prisma.timetable.create({
      data: {
        days,
        course: { connect: { id: courseId } },
      },
      include: { course: true },
    })
    return timetable
  },
  training: async ({ id }) => await prisma.training.findUnique({ where: { id } }),
  trainings: async () => await prisma.training.findMany(),
  createTraining: async ({ courseType }) => await prisma.training.create({ data: { courseType } }),
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
