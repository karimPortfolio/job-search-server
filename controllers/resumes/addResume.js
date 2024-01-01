const uploadFiles = require("../../services/AWS/uploadFiles");
const prisma = require('../../database/prisma');
const { addNewResume } = require("../../database/resume");

exports.addResume = async (req, res) => {
    const file = req.file;
    const user_id = req.params.id;
    try
    {
        //upload file to AWS cloud S3 storage
        const key = `resumes/${file.originalname}`;
        const newUpload = await uploadFiles(key, file.buffer);
        if (!newUpload) return res.status(500).json({type:'failed', message:'Something went wrong while uploading resume.'});
        //store resume info in database
        const resumeInfo = {
            key: newUpload.Key,
            buffer: file.buffer,
            contentType: file.mimetype
        };
        const newResume = await addNewResume(resumeInfo, user_id);
        if (!newResume) return res.status(500).json({type:'failed', message:'Something went wrong'});
        res.status(200).json({type:'success', message:'Resume uploaded with success.'});
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({message:'Something went wrong. Try again later.'});
    }
    finally{
        try
        {
            await prisma.$disconnect;
        }
        catch (disconnectError)
        {
            console.log(disconnectError);
        }
    }
};

