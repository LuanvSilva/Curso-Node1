const path = require('path')

//path absoluto
console.log(path.resolve('teste.txt'))

//formar path

const midfolder = 'relatorio.txt'
const filename = 'luan.txt'

const finalpath = path.join('/','arquivos',midfolder,filename)
console.log(finalpath)