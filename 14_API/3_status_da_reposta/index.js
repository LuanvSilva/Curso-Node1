const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
    res.status(201).json({ message: "Primeira rota criada com sucesso" });
});

app.post('/createproduct',(req,res) =>{
    const name = req.body.name
    const price = req.body.price

    if(!name){
        res.status(422).json({ message:"O campo nome e Obrigatorio" })
    }

    console.log(name)
    console.log(price)

    res.status(200).json({ message:`O produto ${name} foi criado com sucesso` })
} );



app.listen(3000, () => {
    console.log('Servidor está em execução na porta 3000');
});
