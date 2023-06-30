
const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const { use } = require('../routes/PetRoutes')

module.exports = class PetController {
    //create Pets
    static async create(req, res) {
        const { name, age, weight, color } = req.body
        const images = req.files

        const available = true

        //images upload

        //validations
        if (!name) {
            return res.status(400).json({ error: 'O Nome é Obrigatório!' })
        }
        if (!age) {
            return res.status(400).json({ error: 'A Idade é Obrigatório!' })
        }
        if (!weight) {
            return res.status(400).json({ error: 'O Peso é Obrigatório!' })
        }
        if (!color) {
            return res.status(400).json({ error: 'A Cor é Obrigatório!' })
        }
        if (images.lenght === 0) {
            return res.status(400).json({ error: 'A Imagem é Obrigatório!' })
        }
        // get pet Owner
        const token = getToken(req)
        const user = await getUserByToken(token)




        //create Pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,

            },
        })
        images.map((image) =>{
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({ message: "Pet Cadastrado Com Sucesso!", newPet, })
        } catch (error) {
            res.status(500).json({ message: error })
        }

        
    }

    static async getAll(req,res){
        const pets = await Pet.find().sort('-createdAt')
        res.status(200).json({pets: pets,})
    }

    static async getAllUserPets(req,res){
        // get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)


        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }

    
}