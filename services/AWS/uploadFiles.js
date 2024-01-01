
const S3 = require('../../config/AWS');

const uploadFiles = async (key, body) => {
    try
    {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:key,
            Body:body
        }
        const data = await S3.upload(params).promise();
        return data;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
}

module.exports = uploadFiles;
