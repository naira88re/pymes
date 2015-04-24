var frisby = require('c:\\Users\\naira.romero\\AppData\\Roaming\\npm\\node_modules\\frisby');

frisby.create('API: Lista marcaProducto')
    .get('http://localhost/pymes/public/marcas_productos')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();
