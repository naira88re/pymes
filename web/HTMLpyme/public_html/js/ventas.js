
/**
 * Inicializamos la pagina de registrar ventas
 * @returns 
 */
function initRegistrarVentas() {

  $('#fecha').val($.format.date(new Date(), "ddd, d MMM yyyy"));
  autoCompletarProducto();
  $('#btn-insertar-producto').click(function() {
    
    agregarProducto();
  });
}

/**
 * Inicializamos la pagina de listar ventas
 * @returns 
 */
function initListaVentas() {

  //cargarListaUsuarios();
}

/**
 * Inicializamos la pagina de modificar ventas
 * @returns 
 */
function initModificarVenta() {

  //cargarUsuario();
}

/**
 * Funcion que obtiene e inicializa los productos
 * @returns
 */
function autoCompletarProducto() {

  $.get( URLSERVER + "productos", function( data ) {

    var values = [];
    var index = 0;
    for (index in data) {

      values[index] = { 
        id: data[index].id, 
        text: data[index].nombre_producto
      };
    }

    $('#nombreProducto').selectivity({
        allowClear: true,
        items: values,
        placeholder: 'Ingrese Nombre o Codigo'
    });

    $('#nombreProducto').on('selectivity-selected', function(selection) {

      $(this).val(selection.item.text);
      $('#nombreProducto').attr('data-id-producto', selection.item.id);
      $('#cantidadProducto').focus();
    });
  });
}

/**
 * Funcion que prepara el contenido html de un producto
 * para insertar este en la tabla de ventas
 * @param {object} producto 
 * @param {object} marca 
 * @returns {string} html
 */
function generarHTMLProducto(producto, marca) {
  console.log('producto', producto);
  var html = 
    "<tr>" + 
    "<td>" + producto.codigo_producto + "</td>" +
    "<td>" + marca + "</td>"+
    "<td>" + producto.nombre_producto + "</td>" +
    "<td>" + producto.cantidad_producto + "</td>" +
    "<td>" + producto.medida_producto + "</td>" +
    "<td>" + producto.precio_neto_producto +"</td>" +
    "<td>" + producto.precio_venta_producto +"</td>" +
    "<td><a class=\"btn btn-info btn-lg btn-block\" onclick=\"mostrarModalEliminar(" + producto.id + ", event)\"><span class=\"glyphicon glyphicon-trash\"> </span></a></td>" + 
    "</tr>";

    return html;
}

/**
 * Funcion que permite insertar productos en la tabla de ventas
 * @returns {string} html
 */
function agregarProducto() {
  
  var id = $('#nombreProducto').attr('data-id-producto');
  if (id !== undefined ) {
  
    data = { id : id };
    $.ajax({
      url: URLSERVER + 'productos/' + id,
      type: 'GET',
      dataType: 'json',
      data: JSON.stringify(data),
      processData: false,
      contentType: 'application/json',
      CrossDomain:true,
      async: false,
      success: function (producto) {
        console.log('productos', producto);
        $.get( URLSERVER + "marcas_productos", function( data ) {
          for(index in data) {
            var marca = data[index];
            if (marca.id === producto.id_marca_producto) {

              var html = generarHTMLProducto(producto, marca.nombre_marca_producto);
              $('.table-condensed tbody').append(html);
              break;
            }
          };
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }
    });
  }
}

/**
 * Funcion utilizada para obtener todos los productos de una venta
 * registrados en BD
 * @returns 
 */
function cargarListaProductosVenta() {

  $.get( URLSERVER + "ventas", function( data ) {

    var html = "";
    var venta;
    $.get( URLSERVER + "ventas", function( tipos ) {

      for(var index in data) {

        venta = data[index];
        var tipo = getTipo(venta.id_tipo_usuario, tipos);

        html += 
        "<tr onclick=\"mostrarModalModificar(" + usuario.id + ");\">" + 
        "<td>" + usuario.nombre_usuario + "</td>" +
        "<td>" + usuario.apellido_usuario + "</td>"+
        "<td>" + usuario.ci_usuario + "</td>" +
        "<td>" + usuario.telefono_usuario +"</td>" +
        "<td>" + usuario.login_usuario + "</td>" +
        "<td>" + tipo.tipo_usuario + "</td>" +
        "<td><a class=\"btn btn-info btn-lg btn-block\" onclick=\"mostrarModalEliminar(" + usuario.id + ", event)\"><span class=\"glyphicon glyphicon-trash\"> </span></a></td>" + 
        "</tr>";
      };

      $('.table-condensed tbody').html(html);
    });

    $('#listaUsuarios').html(html);
  });
}