const http = require('http')

const port = 3000


 const server = http.createServer((req,res) =>{

    res.write('Ola Progamador')
    res.end()


 })

 server.listen(port, () =>{
    console.log(`O servidor esta rodando na porta ${port}` )

 })