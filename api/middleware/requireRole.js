const jwt = require('jsonwebtoken');
const jwtSecret = 'qwetyuciwdknjqbhdcjnksdwopeW';

function requireRole(role) {
    return (req, res, next) => {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            if (user.role !== role) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }

            req.user = user;
            next();
        });
    };
}

module.exports = { requireRole };
