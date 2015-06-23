function irRegistrarVendedor() {
    $('#modalVendedor').modal('hide');
    $("#contenedor_principal").load('vendedor/registrarVendedor.html');
    $('.modal-backdrop').css('display','none');
    
}


function irPaso1() {
    $('#modalVendedor').modal('hide');
    $("#contenedor_principal").load('proveedor/registrarProveedor.html');
    $('.modal-backdrop').css('display','none');
    
}

