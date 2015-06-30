var URLSERVER = 'http://nairare.gabitosoft.com/pymes/public/';

function irRegistrarVendedor() {
    crearProveedor();
    $("#contenedor_principal").load('vendedor/registrarVendedor.html');
}


function crearProveedor() {

  datos = {
  
    'nombre': $('#nombreEmpresa').val(),
    'telefono': $('#telefonoEmpresa').val(),
    'direccion': $('#direccionEmpresa').val()
  };
  
  
  operacionServidor("empresas", "POST", datos);
  
  $('#nombreEmpresa').val('');
  $('#telefonoEmpresa').val('');
  $('#direccionEmpresa').val('');
 
}


function operacionServidor(ruta, tipo, datos) {

  $.ajax({
      url: URLSERVER + ruta,
      type: tipo,
      dataType: 'json',
      data: JSON.stringify(datos),
      processData: false,
      contentType: 'application/json',
      CrossDomain:true,
      async: false,
      success: function (datos) {
        console.log(datos);
        if (datos.mensaje !== undefined ) {
          mostrarAlerta('OK', 'Operacion realizada con exito!');
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        mostrarAlerta('ERROR', 'Ocurrio un error, porfavor consulte con el administrador.');
      }
    });
}

function cargarListaEmpresas(){
    $.get( URLSERVER + "empresas", function( data ) {
    var html = "";
    var htmlVendedor = "";
    console.log(data);
     
    
    //for(index in data) {
        
        htmlVendedor += "<div>" + 
                        "<h3 id=\"#\"></h3>" +
                        "<h3 id=\"#\"></h3>" +
                        "<h3 id=\"#\"></h3>" +
                        "<button><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>" + 
                        "<button><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>" +    
                        "<!--tabla para cargar informacion de vendedores-->" +
                        "<div>" +
                        "<table class=\"table\">" +
                        "<thead>" +
                        "<tr class=\"success\">" +
                        "<th>Vendedor</th>" +
                        "<th>Celular</th>" +
                        "<th></th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "<tr>" +
                        "<td></td>" +
                        "<td></td>" +
                        "<td></td>" + 
                        "</tr>" +
                        "</tbody>" +
                        "</table>" +
                        "<button><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span></button>"+
                        "</div>" +
                        "</div>";
    //}
    
    for(index in data) {

      var empresa = data[index];
 
      
 
    html+= "<div class=\"panel panel-default\">"+
    "<div class=\"panel-heading\" role=\"tab\" id=\"heading"+empresa.id+"\">"+
     " <h4 class=\"panel-title\">"+
        "<a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#listaEmpresas\" href=\"#collapse" + empresa.id +"\" aria-expanded=\"false\" aria-controls=\"collapse"+empresa.id+"\">"+
          empresa.nombre_empresa+
        "</a>"+
      "</h4>"+
    "</div>"+
    "<div id=\"collapse"+ empresa.id +"\"" + "class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading"+empresa.id+"\">"+
      "<div class=\"panel-body\">"+
        htmlVendedor+
      "</div>"+
    "</div>"+
  "</div>";

    };

    $('#listaEmpresas').html(html);
  });
}