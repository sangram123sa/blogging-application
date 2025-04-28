const { validate } = require("../models/user");
const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) {
            next();
        }
        try {
            const userPayload = validateToken(tokenCookieValue)
            next()
        } catch (error) {

        }
        finally {
            next()
        }
    }
}

module.exports = {
    checkForAuthenticationCookie
}