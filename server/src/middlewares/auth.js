const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    const token = req.header("Authorization") && req.header("Authorization").split(' ')[1]

    if (!token) {
        return res.status(401).send({
            message: "ACCESS DENIED"
        })
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "INVALID TOKEN"
        })
    }
}