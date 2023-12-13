
const {PrismaClient} = require("@prisma/client");

let prisma;
let __db;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    prisma.$connect();
} else {
  if (!__db) {
    __db = new PrismaClient();
    __db.$connect(); 
  }
  prisma = __db;
}

module.exports = prisma;