var frisby = require('c:\\Users\\naira.romero\\AppData\\Roaming\\npm\\node_modules\\frisby');

frisby.create('API: Lista Usuarios')
    .get('http://localhost/pymes/public/usuarios')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();


frisby.create('API: Lista ')
    .post('http://localhost/pymes/public/usuarios')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();


frisby.create('API: Lista Usuarios')
    .put('http://localhost/pymes/public/usuarios')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();


frisby.create('API: Lista Usuarios')
    .delete('http://localhost/pymes/public/usuarios')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();
