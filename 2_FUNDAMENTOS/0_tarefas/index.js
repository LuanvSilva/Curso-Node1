const chalk = require('chalk')
const inquirer = require('inquirer')


inquirer.prompt([{
    name:'nome',
    message:'Qual o seu nome ?'
   
},{

    name:'idade',
    message:'Qual a sua idade'
},
]).then((resposta) =>{

    const resp = `O nome do usuario é ${resposta.nome} e ele tem ${resposta.idade}`
    console.log(chalk.bgYellow.black(resp))

}).catch((error) => console.log(error))