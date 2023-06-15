const express = require('express')
const exphs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(
    express.urlencoded({
        extended: true
    })  
)

conn
.sync()
.then(() =>{
    app.listen(3000)
})
.catch((err) =>{
    console.log(err)
})