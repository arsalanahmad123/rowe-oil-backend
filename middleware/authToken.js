const jwt = require('jsonwebtoken');
async function authToken(req, res, next) {
    //next to go to the next
    try {
        //
        const token = req.cookies?.token;
        // console.log(token, "token");
        if (!token) {
            return res.status(403).json({
                // message: 'Forbidden ',
                error: true,
                success: false,
            });
        }
        // verify a token symmetric
        jwt.verify(
            token,
            process.env.TOKEN_SECRET_KEY,
            function (err, decoded) {
                if (err) {
                    throw new Error('Something went wrong');
                }
                // console.log(err);
                // console.log(decoded) // value of the token
                req.userId = decoded._id; //setting the id
                next(); //go to the next
            }
        );
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
