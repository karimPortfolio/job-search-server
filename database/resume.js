const prisma = require('./prisma');

exports.addNewResume = async (resume, user_id) => {
    try
    {
        const resume_inf = {
            name: resume.key,
            data: resume.buffer,
            contentType: resume.contentType,
            userId:user_id
        };
        const newResume = await prisma.resume.create({
            data:resume_inf
        });
        return newResume;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
}


