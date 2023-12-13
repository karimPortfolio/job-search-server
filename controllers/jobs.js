
const RapidApiConfig = require('../config/RapidApiConfig');
const axios = require('axios');


//Get matched jobs according to user desires
exports.getMatchedJobs = async (req, res) => {
    const {searchValue, location} = req.body;
    try
    {
        const url = `${RapidApiConfig.rapidApiUrl}/search`;
        const options = {
            method: 'GET',
            url: url,
            params: {
                query: location !== '' ? `${searchValue+ ' in '+location}` : searchValue,
                page: '1',
                num_pages: '5'
            },
            headers: {
                'X-RapidAPI-Key': RapidApiConfig.rapidApiKey,
                'X-RapidAPI-Host': RapidApiConfig.rapidApiHost
            }
        };
        const response = await axios.request(options);
        if (response.statusText !== 'OK')
        {
            return res.status(response.status).json({message:'Something went wrong!'});
        }
        res.status(200).json(response.data.data);
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({message:'Something went wrong'});
    }
}



//Get Recent Jobs
exports.recentJobs = async (req, res) => {
    try
    {
        const url = `${RapidApiConfig.rapidApiUrl}/search`;
        const options = {
            method: 'GET',
            url: url,
            params: {
                query: "Software Engineer in USA",
                page: '1',
                num_pages: '1',
                date_posted: 'week',
            },
            headers: {
                'X-RapidAPI-Key': RapidApiConfig.rapidApiKey,
                'X-RapidAPI-Host': RapidApiConfig.rapidApiHost
            }
        };
        const response = await axios.request(options);
        if (response.statusText !== 'OK')
        {
            res.status(400).json({message:'Something went wrong!'});
        }
        const jobs = [];
        response.data.data.forEach( (value, index) => {
            if (index < 6)
            {
                jobs.push(value);
            }
        } )
        res.status(200).json(jobs);
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({message:'Something went wrong'});
    }
}