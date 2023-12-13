
const jwt = require("jsonwebtoken");

exports.registerToken = async (userInformation) => {
    try
    {
        const data = {
            fullName: userInformation.fullName,
            email: userInformation.email,
        }
        const token = await jwt.sign(
            data,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30s"
            }
        );
        console.log(token);
        return token;
    }
    catch (err)
    {
        console.log(err);
    }
}

