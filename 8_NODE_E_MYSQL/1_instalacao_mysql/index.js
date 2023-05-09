const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()





app.get('/', (req,res) =>{
    res.render('home')
})
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luan2023',
    database: 'nodemysql'
})

conn.connect(function(err){
   if(err){ console.log(err)
   }else{
    console.log('connected')
    app.listen(3000)
   }
})