const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')
const Task = require('./models/task')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(
    express.urlencoded({
        extended: true
    })  
)

app.use(express.json())

conn.sync().then(() =>{
    console.log(3000)

}).catch((err) =>{
    console.log(err)
})