const Tought = require('../models/Tought')
const User = require('../models/User')


module.exports = class ToughtsCotroller{
    static async showToughts(){
        res.render('toughts/home')
    }
}