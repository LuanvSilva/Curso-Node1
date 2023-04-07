const chalk = require('chalk')
const { error } = require('console')
const inquirer = require('inquirer')


inquirer.prompt([{
    name:'Digite seu Nome ',
   
},{

    name:'Digite sua idade',
}
]).then((responsta) =>{

    console.log(chalk.bgYellow(responsta))

}).catch((error) => console.log(error))