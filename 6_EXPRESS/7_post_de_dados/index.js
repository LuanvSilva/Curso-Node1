const express = require('express')
const app = express()
const port = 3000
const path =  require('path')

const basePath = path.join(__dirname, 'tamplates')
//ler o body o corpo da requisição atraves de middleware 
app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(express.json())


//Fazer a leitura da pagina usersform.html
app.get('/users/add', (req,res) => {

    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save',(req,res) =>{

const name = req.body.name
const age = req.body.age
// if(name === 'luan' && age ==='26'){
//     console.log('Seja Bem vindo')
//     res.sendFile(`${basePath}/index.html`)

// }else{
    
//     res.end(`<h1>Usuario e senha incorreto </h1>`)
// }

console.log(`O nome do usuario é ${name} e ele tem ${age} anos!`)

res.sendFile(`${basePath}/userform.html`)

})    
// app.get('/users/:id',(req,res) =>{
//     const id = req.params.id

//     //leitura da tabela users, resgatar um usuario do banco
//     console.log(`Estamos buscando pelo usuario ${id}`)
    
//     res.sendFile(`${basePath}/users.html`)
// })

app.get('/',(req,res) =>{
  
    res.sendFile(`${basePath}/index.html`)
})
     
app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`)
})

