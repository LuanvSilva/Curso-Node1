const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
    res.json({ message: "Primeira rota criada com sucesso" });
});

app.post('/createproduct',(req,res) =>{
    const name = req.body.name
    const price = req.body.price

    console.log(name)
    console.log(price)

    res.json({ message:`O produto ${name} foi criado com sucesso` })
} );



app.listen(3000, () => {
    console.log('Servidor está em execução na porta 3000');
});
