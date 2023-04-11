const path = require('path')

const customPath = '/relatorio/luan/relatorios.pdf'

console.log(path.dirname(customPath))  //caminho da pasta  ex:/relatorio/luan
console.log(path.basename(customPath))  //o nome do arquivo ex:relatorios.pdf
console.log(path.extname(customPath)) //o formato do arquivo ex:.pdf