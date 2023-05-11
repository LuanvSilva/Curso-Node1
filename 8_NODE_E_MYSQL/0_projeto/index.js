const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.htm');

});

app.listen(3000, () => {
    console.log('El servidor está en funcionamiento en el puerto 3000');
});
