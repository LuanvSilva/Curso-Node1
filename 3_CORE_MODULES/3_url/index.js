const url =  require('url')
const address = 'https://www.netshoes.com.br/tenis-oakley-stratus-masculino-preto-PFN-1494-006'
const parsedUrl = new url.URL(address)

console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get('tenis'))
