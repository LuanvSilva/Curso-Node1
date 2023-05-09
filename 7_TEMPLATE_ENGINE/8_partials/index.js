const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const hbs = exphbs.create({
    partialsDir:["views/partials"],
})

app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')

app.get('/dashbord',(req,res) =>{
    const itens = ["item A","item B","item C",]
    res.render('dashbord',{itens})
})

app.get('/post',(req,res) =>{
    const post = 
        {
            title: 'Aprender Node Js',
            category:'JavaScript',
            body:'Este artigo vai te ajudar a aprender Node Js ...',
            comments:4,
        }
      
    
    
    res.render('blogpost',{post})
})
////
app.get('/blog',(req,res) =>{
    const posts = [
    {
        title: 'Aprender Node Js',
        category:'JavaScript',
        body:'Este artigo vai te ajudar a aprender Node Js ...',
        comments:4,
    },
    {
        title: 'Aprender PHP',
        category:'php',
        body:'Este artigo vai te ajudar a aprender php ...',
        comments:4,
    },
    {
        title: 'Aprender PYTHON',
        category:'python',
        body:'Este artigo vai te ajudar a aprender python ...',
        comments:4,
    }, 
     {
        title: 'Aprender Go Lang',
        category:'Go lang',
        body:'Este artigo vai te ajudar a aprender Go Lang ...',
        comments:4,
    },
] /////////////
    res.render('blog' ,{posts})
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
//123////////////

app.listen(3000,() =>{
    console.log('Rodando na porta 3000')
})