const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

//middleware

const checkToken = (req,res, next) =>{
    const token = getToken(req)

    if(!req.headers.authorization){
        return res.status(401).send({message:'Você não está autorizado'})
    }

    if(!token){
        return res.status(401).send({
            message: 'Acesso Negado'
            })
    }

    try {
        const veryfild = jwt.verify(token, 'nossosecret')
        req.user = veryfild
        next()
    } catch (error) {
        return res.status(401).send({message:'Token Invalido'})
        
    }

}

module.exports = checkToken