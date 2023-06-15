const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Task = require('./models/task')
const tasksRoutes = require('./routes/tasksRoutes')
/////////////

const app = express()
app.use(
    express.urlencoded({
        extended: true
    })
)
////////////////////////
app.use(express.json())
app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.use('/tasks', tasksRoutes)

conn.sync().then(() =>{
    app.listen(3000, () => console.log('Server is running on port 3000'))
    

}).catch((err) =>{
    console.log(err)
})