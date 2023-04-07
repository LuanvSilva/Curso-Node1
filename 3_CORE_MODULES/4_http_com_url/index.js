const http = require('http')

const port = 3000

const server = http.createServer((req,res) =>{
const urlInfo = require('url').parse(req.url,true)
const name = urlInfo.query.name



res.statusCode = 200
res.headersSent('Contenty-Type, text/html')
if(!name){
 res.end('<h1>Preecha o seu nome:</h1><form method="GET"<input type="text" name="name"')
}else{

}

}) 