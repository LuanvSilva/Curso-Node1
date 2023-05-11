const express = require('express');
const mysql = require('mysql2')
const app = express()
const path = require('path')

const basePath = path.join(__dirname, 'tamplates')

app.get('/', (req, res) => {
    const name = req.body.nome 
    const email = req.body.email
    const senha = req.body.senha
    const telefone = req.body.telefone
    const data = req.body.data

    const sql = `INSERT INTO cadastro (Nome,Email,Senha,Telefone,data) VALUES ( '${nome}','${email}','${senha}','${telefone}','${data}')`
    conn.query(sql,(err)=>{
        if(err){
            console.log(err)

            }else{
                res.redirect('/')
                
        }
    })

});
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luan2023',
    database: 'nodemysql'

    })
conn.connect((err) => { 
    if (err){
        console.log(err)
    }
    console.log('Conectado ao banco')
    app.listen(3000, () => {
    
});
    })



