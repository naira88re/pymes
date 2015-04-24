var frisby = require('c:\\Users\\naira.romero\\AppData\\Roaming\\npm\\node_modules\\frisby');

frisby.create('API: Lista Clientes')
    .get('http://localhost/pymes/public/clientes')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();
