const { registerToken } = require("../../utils/jwt/registerToken");
const prisma = require("../../utils/prisma");
const { getUserWithEmail, createNewUser } = require("../../utils/user");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
    const {fullName, email, password, role} = req.body;
    try
    {
        const user = await getUserWithEmail(email);
        if (user)
        {
            return res.status(400).json({type:'failed', message:'Email has been already taken.'});
        }
        const hashedPassword = await bcrypt.hash(password, 20);
        const user_credentials = {
            fullName,
            email,
            hashedPassword,
            role
        }
        const new_user = await createNewUser(user_credentials);
        if (!new_user)
        {
            return res.status(400).json({type:'failed', message:'Something went wrong while creating account.'});
        }
        console.log(new_user);
        const token = registerToken(new_user);
        if (!token) {
            return res.status(200).json({type:'success', message:'Account created with success.'});
        }
        return res.status(200).json({type:'success', message:'Account created with success.', token:token});
    }
    catch (err)
    {
        res.status(500).json({type:'failed', message:'Something went wrong try again later.'});
    }
    finally
    {
        await prisma.$disconnect();
    }
}

