var frisby = require('c:\\Users\\naira.romero\\AppData\\Roaming\\npm\\node_modules\\frisby');

frisby.create('API: Lista TipoSucursal')
    .get('http://localhost/pymes/public/tipos_sucursales')
    //.expectHeaderContains('content-type', 'application/json')
    .expectStatus(200)
    .toss();
