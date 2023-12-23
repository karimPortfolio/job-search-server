
const bcrypt = require('bcrypt');
const prisma = require('../../database/prisma');
const { getUserByEmail } = require('../../database/user');
const { generateToken } = require('../../utils/jwt/generateToken');



const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedUser = await getUserByEmail(email);
        if (!loggedUser) return res.status(401).json({ type: 'failed', message: "Email or password doesn't matched." });

        const verifyPassword = await bcrypt.compare(password, loggedUser.password);
        if (!verifyPassword) return res.status(401).json({ type: 'failed', message: "Email or password doesn't matched." });

        const token = await generateToken(loggedUser);
        if (!token) return res.status(401).json({ type: 'failed', message: 'Something went wrong try again later.' });

        const userData = {
            id: loggedUser._id,
            fullName: loggedUser.fullName,
            email: loggedUser.email,
            role: loggedUser.roles,
        }

        res.status(200).json({
            type: 'success',
            user: userData,
            token: token
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ type: 'failed', message: 'Something went wrong!' });
    }
    finally {
        try {
            await prisma.$disconnect;
        }
        catch (disconnectError) {
            console.error(disconnectError);
        }
    }
}

module.exports = login;
