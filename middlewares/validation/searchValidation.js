
const validator = require('validator');
const he = require('he');
const cheerio = require('cheerio');


function filterHtmlTags(input) {
    const $ = cheerio.load(input);
    return $.text();
}

exports.validateSearchInputs = (req, res, next) => {

    const searchValue = filterHtmlTags(req.body.searchValue);
    const location = filterHtmlTags(req.body.location);

    if (
        validator.isEmpty(searchValue) ||
        validator.isInt(searchValue) ||
        validator.isFloat(searchValue)
    )
    {
        return res.status(400).json({type:"error", message:"Please enter a job title, company to search."});
    }

    req.body.searchValue = searchValue;
    req.body.location = location;

    next();
}

