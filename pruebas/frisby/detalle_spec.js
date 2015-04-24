var frisby = require('c:\\Users\\naira.romero\\AppData\\Roaming\\npm\\node_modules\\frisby');

frisby.create('API: Lista Detalles')
    .get('http://localhost/pymes/public/detalles')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();