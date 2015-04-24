var frisby = require('c:\\Users\\naira.romero\\AppData\\Roaming\\npm\\node_modules\\frisby');

frisby.create('API: Lista MontoCompra')
    .get('http://localhost/pymes/public/monto_compras')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();