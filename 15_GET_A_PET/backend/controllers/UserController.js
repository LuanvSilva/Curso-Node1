const User = require('../models/User')
const bcrypt = require('bcryptjs')
const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController {
    static async register(req, res) {

        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if (!name) {
            return res.status(401).json({
                error: 'O nome é obrigatório!'

            })
        }
        if (!email) {
            return res.status(401).json({
                error: 'O Email é obrigatório!'

            })
        }
        if (!phone) {
            return res.status(401).json({
                error: 'O Telefone é obrigatório!'

            })
        }
        if (!password) {
            return res.status(401).json({
                error: 'A Senha é obrigatório!'

            })
        }
        if (!confirmpassword) {
            return res.status(401).json({
                error: 'A Confirmação da Senha é obrigatório!'

            })
        }

        if (password !== confirmpassword) {
            return res.status(401).json({
                error: "As senhas não conferem!"
            });
        }

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(422).json({
                error: "Usuario ja cadastrado, Por favor use outro Email!"
            })
        }

        //create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user 
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async login(req, res) {
        const { email, password } = req.body
        if (!email) {
            return res.status(401).json({
                error: 'O Email é obrigatório!'

            })
        }

        if (!password) {
            return res.status(401).json({
                error: 'A Senha é obrigatório!'

            })
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).json({
                error: "Não a usuario cadastrado com este Email"
            })
        }

        //  check if password 

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({
                error: "Senha Inválida"
            })
        }

        await createUserToken(user, req, res)

    }

    static async checkUser(req,res){
        let currentUser
        console.log(req.headers.authorization)
        if(req.headers.authorization){

        }else{
            currentUser=null;
        }
        res.status(200).send(currentUser)
    }
}