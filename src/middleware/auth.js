const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async (req, res, next) => {
    console.log(req.header('Authorization'))
    try {
        console.log("edfewff")
        const token = req.header('Authorization')
        console.log(token)
        const decoded = jwt.verify(token, 'hello')
        console.log(decoded)
        const user = await User.findOne({ '_id': decoded._id, 'tokens.token': token })
        console.log(user)
        if (!user) {
            throw new Error()
        }
          
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({'Error':'Please Authenticate'})

    }

 

}

module.exports = auth