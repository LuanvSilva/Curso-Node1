const express = require('express')
const cors = require('cors')
const app = express()

//Config Json response
app.use(express.json())

//CORS Middleware
app.use(cors({credentials: true, origin:'http//localhost:3000'}));


app.use(express.urlencoded({
    extended: true  
}))

//Router
app.listen(5000,() =>{

    console.log("Server is running")
})
