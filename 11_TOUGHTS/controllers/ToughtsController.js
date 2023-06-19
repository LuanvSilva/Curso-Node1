const { where } = require('sequelize')
const Tought = require('../models/Tought')
const User = require('../models/User')
const { raw } = require('express')


module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home')

        const toughtsData = await Tought.findAll({
            include: User,
        })
        const toughts = toughtsData.map((result) => result.get({plain:true}))

        res.render('toughts/home',{ toughts })
    }
    static async dashboard(req, res) {

        const userId = req.session.userid
        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought,
            plain: true,
        })
        
        if (!user) {
            res.redirect('/login')
        }
        const toughts = user.Toughts.map((result) => result.dataValues)

        let empatyToughts = false
        if(toughts.length === 0){
            empatyToughts = true
        }

        res.render('toughts/dashboard', { toughts , empatyToughts})
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }
    static async createToughtSave(req, res) {

        const tought = {
            title: req.body.title,
            UserId: req.session.userid

        }
        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashbord')
            })
        } catch (error) {

            console.log("erro", error);
        }
    }

    static async removeTought(req,res){
        const id = req.body.id
        const UserId = req.session.userid
        try {
            await Tought.destroy({where: {id: id, UserId: UserId }})
            req.flash('message', 'Pensamento removido com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashbord')
            })
        } catch (error) {
            console.log("erro", error);
        }
        

    }

    static async updateTought(req,res){
        const id = req.params.id;
        const tought = await Tought.findOne({where: {id: id}, raw:true})
        res.render('toughts/edit', {tought})
    }

    static async updateToughtSave(req,res) {
        const id = req.body.id
        const tought ={
            title : req.body.title,
        }
        
        try {
           await Tought.update(tought, {where: {id: id}}) 
           req.flash('message', 'Pensamento Atualizado com sucesso')

           req.session.save(() => {
               res.redirect('/toughts/dashbord')
           })
        } catch (error) {
            console.log("erro", error);
        }
    }
}