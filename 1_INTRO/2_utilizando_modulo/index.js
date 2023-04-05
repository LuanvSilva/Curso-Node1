const fs = require('fs') //file system

fs.readFile('arquivo','utf8',(err,data) =>{ //Funçao para leitura de arquivos
    if(err){
        console.log(err)
    }
    console.log(data)
})

