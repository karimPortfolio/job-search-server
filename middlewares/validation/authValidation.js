const validator = require('validator');
const he = require('he');
const cheerio = require('cheerio');

function filterHtmlTags(input) {
    const $ = cheerio.load(input);
    return $.text();
}

exports.validateUserCredentialsRegister = (req, res, next) => {
    if (!req.body.fullName && !req.body.email && !req.body.password && !req.body.role)
    {
        return res.status(400).json({type:'failed', element:"all", message:'Please provide all required fields.'});
    }

    //remove html tags
    const fullName = filterHtmlTags(req.body.fullName);
    const email = filterHtmlTags(req.body.email);
    const password = filterHtmlTags(req.body.password);
    const role = filterHtmlTags(req.body.role);

    // Validate Full Name
    if (typeof fullName !== 'string' || !validator.isAlpha(fullName.replace(/\s/g, ''))) {
        return res.status(400).json({ type: 'failed', element:"name", message: 'Invalid name format.' });
    }

    // Validate Email Format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ type: 'failed', element:"email", message: 'Invalid email format.' });
    }

    // Password Strength Validation
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        return res.status(400).json({
            type: 'failed',
            element:"password",
            message: 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.',
        });
    }


    req.body = {
        fullName,
        email,
        password,
        role
    }

    next()
}


exports.validateUserCredentialsLogin = (req, res, next) => {
    if (!req.body.fullName && !req.body.email) return res.status(400).json({type:'failed', message:'Please provide all required fields.'});


    const email = filterHtmlTags(req.body.email);
    const password = filterHtmlTags(req.body.password);

    if (typeof email !== 'string' || typeof password !== 'string') return res.status(400).json({type:'failed', message:'Invalid email or password.'});

    req.body = {
        email,
        password
    }

    next()
}

