const minimist = require('minimist')

//externo 



//interno
const soma = require('./soma').soma  // importando a funcao soma do arquivo soma.js

const args = minimist(process.argv.slice(2))


const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a,b)
