
const jwt = require("jsonwebtoken");

exports.generateToken = async (userInformation) => {
    try
    {
        const data = {
            id: userInformation._id,
            fullName: userInformation.fullName,
            email: userInformation.email,
            role: userInformation.roles,
        }
        const token = await jwt.sign(
            data,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30s"
            }
        );
        return token;
    }
    catch (err)
    {
        console.log(err);
    }
}

