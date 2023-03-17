const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    students: async () => {
      return prisma.student.findMany();
    },
    student: async (_, { id }) => {
      return prisma.student.findUnique({
        where: { id },
      });
    },
    grade: async (_, { id }) => {
      return prisma.grade.findUnique({
        where: { id },
      });
    },
    Grades: async () => {
      return prisma.grade.findMany();
    },
    departments: async () => {
      return prisma.department.findMany();
    },
    department: async (_, { id }) => {
      return prisma.department.findUnique({
        where: { id },
      });
    },
    addresses: async () => {
      return prisma.address.findMany();
    },
    address: async (_, { id }) => {
      return prisma.address.findUnique({
        where: { id },
      });
    },
    courses: async () => {
      return prisma.course.findMany();
    },
    course: async (_, { id }) => {
      return prisma.course.findUnique({
        where: { id },
      });
    },
    classes: async () => {
      return prisma.class.findMany();
    },
    class: async (_, { id }) => {
      return prisma.class.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createStudent: async (_, args) => {
      return prisma.student.create({
        data: {
          id: args.id,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          phone: args.phone,
          website: args.website,
          address_id: args.address_id,
        },
      });
    },
    updateStudent: async (_, args) => {
      return prisma.student.update({
        where: {
          id: args.id,
        },
        data: {
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          phone: args.phone,
          website: args.website,
          address_id: args.address_id,
        },
      });
    },
    deleteStudent: async (_, { id }) => {
      return prisma.student.delete({
        where: { id },
      });
    },
    createGrade: async (_, args) => {
      return prisma.grade.create({
        data: {
          value: args.value,
          description: args.description,
          student: {
            connect: { id: args.studentId },
          },
          class: {
            connect: { id: args.classId },
          },
        },
      });
    },
    updateGrade: async (_, args) => {
      return prisma.grade.update({
        where: {
          id: args.id,
        },
        data: {
          value: args.value,
          description: args.description,
          student: args.studentId
            ? {
                connect: { id: args.studentId },
              }
            : undefined,
          class: args.classId
            ? {
                connect: { id: args.classId },
              }
            : undefined,
        },
      });
    },
    deleteGrade: async (_, { id }) => {
      return prisma.grade.delete({
        where: { id },
      });
    },
    createDepartment: async (_, args) => {
      return prisma.department.create({
        data: {
          name: args.name,
          address: args.addressId
            ? {
                connect: { id: args.addressId },
              }
            : undefined,
        },
      });
    },
