const validator = require('validator');

//the allowed file types and their corresponding MIME types
const allowedFileTypes = ['pdf', 'docx'];
const allowedMimeTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

exports.resumeUploadValidation = (req, res, next) => {
    const { file } = req;

    //check if a file is present in the request
    if (!file) {
        return res.status(400).json({ type:'failed', message:'Please upload your resume.' });
    }

    //check file type based on extension
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
        return res.status(400).json({type:'failed', message: 'Invalid resume file type. Only .pdf and .docx files are allowed.' });
    }

    //check the file type based on MIME type
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({type:'failed', message: 'Invalid resume file type. Only .txt, .pdf, and .docx files are allowed.' });
    }

    //check the file size
    const fileSizeInBytes = file.buffer.length;
    const maxFileSizeInBytes = 1024 * 1024; // 1 MB limit
    if (fileSizeInBytes > maxFileSizeInBytes) {
        return res.status(400).json({ type:'failed', message: 'Resume file size must be 1 MB limit or less.' });
    }

    next();
}

