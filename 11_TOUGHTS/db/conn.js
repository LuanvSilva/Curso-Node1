const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('cursoNode','root','Luan2023',{
    host: 'localhost',
    dialect:'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos Com Sucesso')
} catch (error) {
    console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize