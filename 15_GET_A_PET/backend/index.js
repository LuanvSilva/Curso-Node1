const express = require('express')
const cors = require('cors')
const app = express()

//Config Json response
app.use(express.json())
app.use(express.urlencoded({
    extended: true  
}))
//CORS Middleware
app.use(cors({credentials: true, origin:'http//localhost:3000'}));


//Router
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.listen(5000,() =>{

    console.log("Server is running")
})
/////////////////////
////////////
