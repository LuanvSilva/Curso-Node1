const express = require('express')
const app = express()
const port = 3000
const path =  require('path')

const basePath = path.join(__dirname, 'tamplates')

const checkAuth = function(req,res, next){

         req.authStatus = true
         if(req.authStatus){

            console.log('Esta logado, pode continuar')
            next()
         }else{
            console.log('Não esta logado, faça o login para continuar')
            next()
         }

}
app.use(checkAuth)
app.get('/users/:id',(req,res) =>{
    const id = req.params.id

    //leitura da tabela users, resgatar um usuario do banco
    console.log(`Estamos buscando pelo usuario ${id}`)
    
    res.sendFile(`${basePath}/users.html`)
})

     
app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`)
})