const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc','root','Luan2023',{
    host: 'localhost',
    dialect: 'mysql',
})

try {
    
    sequelize.authenticate()
    console.log('Conectamos com sucesso com sequelize!')
} catch (error) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize