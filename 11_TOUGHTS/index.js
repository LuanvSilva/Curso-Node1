const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//recebe resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//template engine
app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

// session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized:false,
        store : new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'session')
        }),
        cookie:{
            secure:false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

//flash mensagem
app.use(flash())

//set session to res
app.use((req,res,next)=>{

    if(req.session.userid){
        res.locals.session = req.session
    }
    next()

})








conn
.sync()
.then(() =>{
    app.listen(3000)
})
.catch((err) =>{
    console.log(err)
})