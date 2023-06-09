const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const { get } = require('mongoose')

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
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        }else{
            currentUser=null;
        }
        res.status(200).send(currentUser)
    }

    static async getUserById(req,res){
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }
        res.status(200).json({ user })
    }


    static async editUser(req,res){

        //check if user exists
        const id = req.params.id
        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, phone, password, confirmpassword} = req.body
       

        if(req.file){
            user.image = req.file.filename
        }
           //validations
           if (!name) {
            return res.status(401).json({
                error: 'O nome é obrigatório!'

            })
        }
        user.name = name
        if (!email) {
            return res.status(401).json({
                error: 'O Email é obrigatório!'

            })
        }
        
        //check if email has already taken
        const userExists = await User.findOne({email: email})

        if(user.email !== email && userExists ){
            res.status(422).json({ message:'Por favor utilize outro email' })
            return
        }



        if(!user){
            res.status(422).json({ message:'Usuário não existe' })
            return
        }

        if (!phone) {
            return res.status(401).json({
                error: 'O Telefone é obrigatório!'

            })
        }
        user.phone = phone

        if (password != confirmpassword) {
            return res.status(401).json({
                error: 'As Senha não conferem'
            

            })
            
        }else if(password === confirmpassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash

        }

        try {
            
            //return user updated data 
            const updated = await User.findByIdAndUpdate({_id: user._id},{$set: user},{new: true})
             res.status(200).json({
                message: "Ususario atualizado com sucesso"})
        } catch (error) {
            return res.status(401).json({
            message: error})
        }
      

        
        
        
    }
    
}