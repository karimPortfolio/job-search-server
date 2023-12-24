
const prisma = require("./prisma");


exports.createNewUser = async (user) => {
    try {
        const new_user = await prisma.user.create({
            data: {
                fullName: user.fullName,
                email: user.email,
                password: user.hashedPassword,
                roles: user.role,
            }
        });
        return new_user;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

exports.getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({ where: { email: email } });
        return user;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}


