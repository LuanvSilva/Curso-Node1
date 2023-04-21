const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.get('/dashbord',(req,res) =>{
    const itens = ["item A","item B","item C",]
    res.render('dashbord',{itens})
})

app.get('/',(req,res) =>{
    const user = {
        name:'Luan',
        surname:'Vitorio',
        age:26
    }
    const palavra = 'Athletico Pr'
    const auth = true
    const approved = false
    
    
    res.render('home',{user: user,palavra,auth,approved})

})

app.listen(3000,() =>{
    console.log('Rodando na porta 3000')
})