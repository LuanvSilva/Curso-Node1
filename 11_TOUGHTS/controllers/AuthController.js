const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        const {email, password} = req.body
        //find user
        const user = await User.findOne({where:{email: email}})
        if(!user){
            req.flash('message','Usuario Não encontrado!')
            res.render('auth/register')
            return
        }
        //check if password math
        const passwordMatch = await bcrypt.compareSync(password, user.password)
        if(!password){
            req.flash('message','Senha incorreta!')
            res.render('auth/login')
        }
    }
    static register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){

        const {name, email, password, confirmpassword} = req.body
        if(password != confirmpassword) {
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
          const createdUser = await User.create(user)

            //inicializar a sessão
            req.session.userid = createdUser.id;

            req.flash('message','Cadastro realizado com sucesso!')

            req.session.save(() =>{
                res.redirect('/')
            })
            

        } catch (error) {
            console.log(error)
        }
    }
    static logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }
}