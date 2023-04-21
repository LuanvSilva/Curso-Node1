const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.get('/',(req,res) =>{
    const user = {
        name:'Luan',
        surname:'Vitorio',
        age:26
    }
    const palavra = 'Athletico Pr'
    
    
    res.render('home',{user: user,palavra})

})

app.listen(3000,() =>{
    console.log('Rodando na porta 3000')
})