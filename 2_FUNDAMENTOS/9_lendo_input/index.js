const redline = require('readline').createInterface({
    input:process.stdin,
    output:process.stdout,
})

redline.question('Qual a sua linguagem favorita  ', (language) => {
    console.log(`A minha linguagem favorita e : ${ language }`)
    redline.close()
})