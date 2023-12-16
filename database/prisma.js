
const {PrismaClient} = require("@prisma/client");


const prisma = new PrismaClient();

try
{
    prisma.$connect();
}
catch (err)
{
    console.log(err);
}

module.exports = prisma;