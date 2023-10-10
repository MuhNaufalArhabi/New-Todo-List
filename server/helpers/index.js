const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'rahasia'

const hashPass = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
}

const comparePass = (pass, hash) => {
    return bcrypt.compareSync(pass, hash)
}

const jwtSign = (payload) => {
    return jwt.sign(payload, secret)
}

const jwtVerify = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    hashPass,
    comparePass,
    jwtSign,
    jwtVerify
}