const { generateToken } = require("../../utils/jwt/generateToken");
const prisma = require("../../database/prisma");
const { getUserByEmail, createNewUser } = require("../../database/user");
const bcrypt = require("bcrypt");


const register = async (req, res) => {

    const { fullName, email, password, role } = req.body;

    try {
        //check if the email already exists
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(409).json({ type: 'failed', message: 'Email has been already taken.' });
        }
        //hash user password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user_credentials = {
            fullName,
            email,
            hashedPassword,
            role
        }
        //create new user account
        const new_user = await createNewUser(user_credentials);
        if (!new_user) {
            return res.status(401).json({ type: 'failed', message: 'Something went wrong while creating account.' });
        }
        //create token for auth
        const token = await generateToken(new_user);
        if (!token) {
            return res.status(200).json({ type: 'success', message: 'Account created with success.' });
        }
        const user_data = {
            id: new_user._id,
            fullName: new_user.fullName,
            email: new_user.email,
            role: new_user.roles,
        }
        return res.status(200).json(
            {
                type: 'success',
                message: 'Account created with success.',
                user: user_data,
                token: token
            }
        );
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ type: 'failed', message: 'Something went wrong try again later.' });
    }
    finally {
        try {
            await prisma.$disconnect();
        } catch (disconnectError) {
            console.error('Prisma disconnect error:', disconnectError);
        }
    }
}

module.exports = register;
