const fs = require('fs')

if(!fs.existsSync('./minhapasta')){
    console.log('Nao existe!')
    fs.mkdirSync('minhapasta')
}

if(fs.existsSync('./minhapasta')){
    console.log('Existe!')
}