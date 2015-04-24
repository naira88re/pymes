var frisby = require('c:\\Users\\naira.romero\\AppData\\Roaming\\npm\\node_modules\\frisby');

frisby.create('API: Lista Empresas')
    .get('http://localhost/pymes/public/empresas')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();