const jwt = require('jsonwebtoken');
const Realtor = require('../models/realtorModel');

const realtorMiddleware = async (req, res, next) => {
    try {
        // Get the token from the cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);

        // Find the realtor based on the decoded token
        const realtor = await Realtor.findOne({ email: decoded.email });

        if (!realtor) {
            return res.status(401).json({ msg: 'Invalid token, realtor not found' });
        }

        // Attach the realtor object to the request for further use
        req.realtor = realtor;

        // Call next middleware
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = realtorMiddleware;
