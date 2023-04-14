const express = require('express')
const app = express()
const port = 3000
const path =  require('path')
const users = require('./users')


app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(express.json())
//arquivos estaticos

app.use(express.static('public'))

const basePath = path.join(__dirname, 'tamplates')

app.use('/users',users)

app.get('/',(req,res) =>{
  
    res.sendFile(`${basePath}/index.html`)
})

app.use((req,res,next) =>{
res.status(404).sendFile(`${basePath}/404.html`)

}) 
     
app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`)
})

