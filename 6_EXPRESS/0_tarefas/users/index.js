const express = require('express')
const path = require('path')
const router = express.Router()


const basePath = path.join(__dirname,'../tamplates')
router.get('/add',(req,res) =>{

    res.sendFile(`${basePath}/index.html`)
    
    })

    module.exports = router