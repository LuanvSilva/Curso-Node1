const express = require('express')
const app = express()
const users = require('./users')
const path = require('path')
const port = 5000
const basePath = path.join(__dirname,'tamplates')
app.use(
    express.urlencoded({
        extended:true,
    })
)

app.use(express.static('public'))


app.get('/users',users)

app.get('/',(req,res) =>{
    res.sendFile(`${basePath}/index.html`)

})

app.listen(port,() =>{
    console.log(`Servidor esta rodando na porta ${port}`)
})