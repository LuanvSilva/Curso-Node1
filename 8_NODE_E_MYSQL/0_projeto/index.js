const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');

const basePath = path.join(__dirname, 'tamplates');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});
//////
app.post('/books', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const telefone = req.body.telefone;
    const data = req.body.data;

    const sql = `INSERT INTO cadastro (Nome, Email, Senha, Telefone, Nascimento) VALUES ('${nome}', '${email}', '${senha}', '${telefone}', '${data}')`;
    conn.query(sql, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.redirect('/');
        }
    });
});
app.get('/update', (req, res) => {
    res.sendFile(`${basePath}/update.html`);
});

app.post('/update',(req,res) =>{
 const id = req.body.id;
 const nome = req.body.nome;
 const email = req.body.email;
 const senha = req.body.senha;
 const telefone = req.body.telefone;
 const data = req.body.data;

 const sql = `UPDATE cadastro SET Nome = '${nome}', Email = '${email}', Senha = '${senha}', Telefone = '${telefone}', Nascimento = '${data}' WHERE id = ${id}`
 conn.query(sql, (err) => {
    if (err) {
        console.log(err);
        res.sendStatus(500);
        } else {
            res.redirect('/');
            }
});
app.get('/delete', (req, res) => {
    res.sendFile(`${basePath}/delete.html`);
});

app.post('/delete',(req,res) =>{
    const id = req.body.id;
    const sql = `DELETE FROM cadastro WHERE id = ${id}`
    conn.query(sql, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            } else {
                res.redirect('/');
                }
});
})





})
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luan2023',
    database: 'nodemysql'
});

conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Conectado ao banco');
    app.listen(3000, () => {
        console.log('Servidor iniciado na porta 3000');
    });
});
