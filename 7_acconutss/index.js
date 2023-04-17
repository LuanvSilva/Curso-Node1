const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')
console.log('Iniciamos o Accouts')
operation()
function operation(){

  inquirer.prompt([{
    type:'list',
    name: 'action',
    message:'Oque você deseja fazer ',
    choices:[
        'Criar Conta',
        'Consultar Saldo',
        'Depositar',
        'Sacar',
        'Sair',
    ],

  },]).then((ansewer) =>{
    const action = ansewer['action']
    console.log(action)

    if(action === 'Criar Conta'){
        createAccount()
    }else if(action === 'Depositar'){
        deposit()
    }else if(action === 'Consutar Saldo'){

    }else if(action === 'Depositar'){

    }else if(action === 'Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
    }
    
  }).catch((err) =>{console.log(err)})
}

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('define as opções da sua conta a seguir '))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{
        name:'accountName',
        message:'Digite um nome para sua conta ',

    },]).then((ansewer)=>{
        const accountName = ansewer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')

        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black( 'Esta conta ja existe escolha outro nome!'))
            buildAccount()
            return
        }    
        fs.writeFileSync(`accounts/${accountName}.json`,'{"balance":0}', (err) =>{
                console.log(err)
        },)
        console.log(chalk.green('Parabéns, sua conta foi criada! '))
        operation()

    }).catch((err) => {console.log(err)})
}
function deposit(){
    
}