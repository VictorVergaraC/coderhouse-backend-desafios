const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 8080;



app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto: ${PORT}`));