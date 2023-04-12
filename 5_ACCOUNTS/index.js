const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')
const { error } = require('console')
operation()
function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que voce deseja fazer',
            choices: ['Criar Conta', 'Consutar Saldo', 'Depositar', 'Sacar', 'Sair',],
        },
    ]).then((answer) => {
        const action = answer['action']
        if(action === 'Criar Conta'){
            createAccount()
        }else if(action === 'Depositar'){
            deposit()
        }else if(action === 'Consutar Saldo'){
            getAccountBalance()

        }else if(action === 'Sacar'){
            withdraw()

        }else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o account!'))
            process.exit()
        }

    }).catch((err) => console.log(err))
}
 //Criação de conta
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.bgGreen('Defina as opção da sua conta a seguir'))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{

        name:'accoutName',
        message:'Digite um nome para sua conta',


    },]).then((answer) =>{
        const accoutName = answer['accoutName']
        console.info(accoutName)
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/ ${accoutName}.json`)){
            console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome!'),)
            buildAccount()
            return
        }
        fs.writeFileSync(`accounts/${accoutName}.json`,'{"balance":0}',function(err){
            console.log(err)
        },)
            console.log(chalk.green('Parabéns, a sua conta foi criada'))
            operation()
    }).catch((err) => console.log(err))
}


//Funçao para depositar dinheiro na conta
function deposit(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta',
    },]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit()
        }
        //////////////////////////////////
        inquirer.prompt([{
            name:'amount',
            message:'Quanto voce deseja depositar',

        },]
        ).then((answer) =>{
            const amount = answer['amount']
            addAmount(accountName,amount)
            operation()

        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
}

//FUNÇAO QUE VERIFICA SE A CONTA EXISTE
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta nao existe, escolha outro nome!'))
        return false
    }
    return true
}

// FUNÇAO RESPONAVEL POR DEPOSITAR E VERIFICAR SE FOI FEITO DEPOSITO
function addAmount(accountName, amount){

const accountData = getAccount(accountName)


if(!amount){
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde! '))
    return deposit()
} 

 accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
    console.log(err)
})
console.log(chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta!`))
}

//FUNÇAO RESPONSAVEL POR VERIFICAR A LEITURA DA CONTA
function getAccount(accountName){
const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {encoding:'utf-8', flag:'r'})

return JSON.parse(accountJSON)

}

// FUNÇAO PARA EXIBIR E VERIFICAR SE EXISTE SALDO NA SUA CONTA  
function getAccountBalance(){
    inquirer.prompt([{

        name:'accountName',
        message: 'Qual o nome da sua Conta',
    },]).then((answer) =>{
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            getAccountBalance()
        }

        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`Olá o saldo da sua conta e de ${accountData.balance}`))
       
        operation()

    }).catch((err) =>{console.log(err)})
}

//FUNÇAO RESPONSAVEL POR SACAR DINHEIRO DA CONTA 
function withdraw() {
  inquirer.prompt([{
    name:'accountName',
    message:'Qual o nome sa sua conta',
  },]).then((answer) =>{
    const accoutName = answer['accountName']
    if(!checkAccount(accoutName)){
        return withdraw()
    }

    inquirer.prompt([{
        name:'amount',
        message:'Quanto voce deseja',

    },]).then((answer) =>{
        const amount = answer['amount']
        removeAmount(accoutName,amount)
       


    }).catch((err) =>{console.log(err)})

  }).catch((err) =>{console.log(err)})

}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return withdraw()
    }
    if(accountData < amount){
        console.log(chalk.bgRed.black('Valor Indisponivel'))
        return withdraw()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
        console.log(err) },)

        console.log(chalk.green(`Foi realizado um saque de ${amount} da sua conta `))
            operation()
    }


    function transfer() {
        inquirer.prompt([{
          name:'accountName',
          message:'Qual o nome da sua conta',
        },]).then((answer) =>{
          const accoutName = answer['accountName']
          if(!checkAccount(accoutName)){
              return transfer()
          }      
      
          inquirer.prompt([{
              name:'amount',
              message:'Quanto voce deseja transferir',
      
          },]).then((answer) =>{
              const amount = answer['amount']
              removeAmount(accoutName,amount)
             
      
      
          }).catch((err) =>{console.log(err)})
      
        }).catch((err) =>{console.log(err)})
      
      }
      
      function removeAmount(accountName, amount){
          const accountData = getAccount(accountName)
      
          if(!amount){
              console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
              return transfer()
          }
          if(accountData < amount){
              console.log(chalk.bgRed.black('Valor Indisponivel'))
              return transfer()
          }
          accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
      
          fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
              console.log(err) },)
      
              console.log(chalk.green(`Foi realizado uma tranferencia  de ${amount} da sua conta `))
                  




          }
      
          
      
