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

  },]).then((answer) =>{
    const action = answer['action']
    console.log(action)

    if(action === 'Criar Conta'){
        createAccount()
    }else if(action === 'Depositar'){
       deposit()
    }else if(action === 'Consultar Saldo'){
        getAccountBalance()
    }else if(action === 'Sacar'){
        withdraw()
    }else if(action === 'Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
    }
    
  }).catch((err) =>{console.log(err)})
}

//FUNÇAO RESPONSAVEL PELO INICIO 
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('define as opções da sua conta a seguir '))
    buildAccount()
}
//FUNCAO RESPONSAVEL POR CRIAR UMA CONTA //VERIFICA SE JA EXISTE SE NAO CRIA UMA NOVA
function buildAccount(){
    inquirer.prompt([{
        name:'accountName',
        message:'Digite um nome para sua conta ',

    },]).then((answer)=>{
        const accountName = answer['accountName']
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

//FUNÇAO DE DEPOSITO

function deposit(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta',


    },]).then((answer) =>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit()
        }
        inquirer.prompt([{
            name:'amount',
            message:'Quantos voce deseja depositar',
        },]).then((answer) =>{
            const amount = answer['amount']
            addAmount(accountName,amount)
            operation()

        }).catch((err) =>{console.log(err)})
 
    }).catch((err) =>{console.log(err)})
}

//FUNÇAO RESPONSAVEL POR VERIFICAR SE CONTA JA EXISTE
function checkAccount(accountName){

    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black( 'Esta Conta nao existe, escolha outro nome'))
    return false
    } 

    return true 
}

//RESPONSAVEL POR VERIFICAR SE TEM ERRO NO DEPOSITO/ E FAZER O DEPOSITO NA CONTA
function addAmount(accountName,amount){

    const accountDate = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente'))
        return operation()
    }

    accountDate.balance = parseFloat(amount) + parseFloat(accountDate.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountDate), function (err) {
        console.log(err)
    }
    )
 console.log(chalk.green(`Foi depositado o valor de ${amount} na sua conta!`))
 
}
//FUNÇAO RESPONSAVEL POR FAZER A LEITURA DA CONTA
function getAccount(accountName){
const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
    encoding:'utf-8',
    flag: 'r',
    
})

return JSON.parse(accountJSON)

}

//FUNÇÃO RESPONSAVEL POR CONSULTAR O SALDO DA CONTA

function getAccountBalance(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta ?',
    },]).then((answer) =>{
        const accountName =  answer['accountName']
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountDate = getAccount(accountName)
        console.log(chalk.bgBlue.black(`Ola, o saldo da sua conta e de R$ ${accountDate.balance}`),)
        operation()

    }).catch((err) =>{console.log(err)})
}

//FUNÇAO RESPONSAVEL POR SAQUE DA CONTA
function withdraw(){

inquirer.prompt([{
    name:'accountName',
    message:'Qual o nome da sua conta',
},]).then((answer) =>{
    const accountName = answer['accountName']
    if(!checkAccount(accountName)){
        return withdraw()
    }

    inquirer.prompt([{
        name:'amount',
        message:'Quanto voce deseja sacar',
    },]).then((answer) =>{
         const amount = answer['amount']

        removeAmount(accountName,amount)

    
    }).catch((err) =>{console.log(err)})
} ).catch((err) =>{console.log(err)})

}



function removeAmount(accountName,amount){
const accountDate = getAccount(accountName)

if(!amount){
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'),)
    return withdraw()
}
  if(accountDate.balance < amount){
    console.log(chalk.bgRed.black('Valo indisponivel'))
    return withdraw()
  }

   accountDate.balance = parseFloat(accountDate.balance) - parseFloat(amount)
   fs.writeFileSync(`accounts/${accountName}.json`,JSON.stringify(accountDate),(err) =>{console.log(err)})

   console.log(chalk.green(`Foi realizado um saque de R$ ${amount} da sua conta!`))

  operation()

}