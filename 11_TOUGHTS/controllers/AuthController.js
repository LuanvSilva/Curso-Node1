const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req,res){
        res.render('auth/login')
    }
    static register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){

        const {name, email, password, confirmPassword} = req.body
        if(!password ||!confirmPassword) {
            req.flash('message','As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }
        const checkIfUserExists = await User.findOne({where: {email: email}})
        if(checkIfUserExists){
            req.flash('message', 'Já existe um usuário cadastrado com esse e-mail.')
            res.render('auth/register')
            return
        }
        //create password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user ={
            name,
            email,
            password: hashedPassword
        }
        try {
            await User.create(user)
            req.flash('message','Cadastro realizado com sucesso!')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}