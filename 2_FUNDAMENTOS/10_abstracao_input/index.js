const inquirer = require('inquirer')

inquirer.prompt([{
    name: 'p1',
    message:'Qual a primeira nota'
},{
    name:'p2',
    message: 'Qual a segunda nota?'

}]).then((resposta) =>{
    console.log(resposta)
    const media = (parseInt(resposta.p1) + parseInt(resposta.p2)) / 2
    console.log(`A media entre  P1 e P2 é ${ media}`)
}).catch(err => console.log(err))