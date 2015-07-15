/**
 * Funcion que utilizamos para inicializar 
 * la pagina de registro de productos
 * @returns 
 */
function initRegistrarProducto() {
  
    autoCompletarMarca();
}

/**
 * Funcion que utilizamos para inicializar
 * la pagina de modificar productos
 * @returns
 */
function initModificarProducto() {

  autoCompletarMarca();
}

/**
 * Funcion que obtiene e inicializa las marcas
 * para el respectivo registro productos
 * @returns
 */
function autoCompletarMarca() {

  $.get( URLSERVER + "marcas_productos", function( data ) {

    var values = [];
    var index = 0;
    for (index in data) {

      values[index] = { 
        id: data[index].id, 
        text: data[index].nombre_marca_producto
      };
    }

    $('#marca').selectivity({
        allowClear: true,
        items: values,
        placeholder: 'Marca Producto'
    });

    $('#marca').on('selectivity-selected', function(selection) {

      $(this).val(selection.item.text);
      $('#marca').attr('data-id-marca', selection.item.id);
    });
  });
}

/**
 * Funcion utilizada para obtener todos los productos
 * de la base de datos
 * @returns 
 */
function cargarListaProductos() {

  $.get( URLSERVER + "productos", function( data ) {

    var html = "";
    var producto;

    $.get( URLSERVER + "marcas_productos", function( marcas ) {

      for(var index in data) {
        
        producto = data[index];
        var marca = getMarca(producto.id_marca_producto, marcas);
        
        html += 
        "<tr onclick=\"mostrarModalModificar(" + producto.id + ");\">" + 
        "<td>" + producto.codigo_producto + "</td>" +
        "<td>" + marca.nombre_marca_producto + "</td>"+
        "<td>" + producto.nombre_producto + "</td>" +
        "<td>" + producto.cantidad_producto + "</td>" +
        "<td>" + producto.medida_producto + "</td>" +
        "<td>" + producto.precio_neto_producto +"</td>" +
        "<td>" + producto.precio_venta_producto +"</td>" +
        "<td><a class=\"btn btn-info btn-lg btn-block\" onclick=\"mostrarModalEliminar(" + producto.id + ", event)\"><span class=\"glyphicon glyphicon-trash\"> </span></a></td>" + 
        "</tr>";
      };

      $('.table-condensed tbody').html(html);
    });
  });
}

/**
 * 
 * @param {int} id
 * @param {array} marcas
 * @returns {Marca}
 */
function getMarca(id, marcas) {

  for(var index in marcas) {
    
    if (marcas[index].id === id) {
      return marcas[index];
    }
  }
}

/**
 * Funcion utilizada para eliminar productos de la BD
 * @returns 
 */
function eliminarProducto() {

  var id = $('#modalEliminarProducto').attr('data-id-producto');

  datos = { 'id': id };
  operacionServidor("productos", "DELETE", datos);

  $('#modalEliminarProducto').attr('data-id-producto', '');
  $('#modalEliminarProducto').modal('hide');
  cargarListaProductos();
}

/**
 * Funcion utilizada para crear productos en BD
 * @returns 
 */
function crearProducto() {

  datos = {  
    'codigo_producto': $('#codigo').val(),
    'nombre_producto': $('#nombre').val(),
    'medida_producto': $('#medida').val(),
    'cantidad_producto': $('#cantidad').val(),
    'precio_neto_producto': $('#compra').val(),
    'precio_venta_producto': $('#venta').val(),
    'id_marca_producto': $('#marca').attr('data-id-marca')
  };

  operacionServidor("productos", "POST", datos);

  $('#codigo').val('');
  $('#nombre').val('');
  $('#medida').val('');
  $('#cantidad').val('');
  $('#venta').val('');
  $('#compra').val('');
  $('#marca').val('');
  $('#marca').attr('data-id-marca', '');
}

/**
 * Funcion utilizada para realizar cambios en un 
 * producto especifico
 * @returns 
 */
function modificarProducto() {

  datos = {

    'id': $('#id').val(),
    'codigo_producto': $('#codigo').val(),
    'nombre_producto': $('#nombre').val(),
    'medida_producto': $('#medida').val(),
    'cantidad_producto': $('#cantidad').val(),
    'precio_venta_producto': $('#venta').val(),
    'precio_neto_producto': $('#compra').val(),
    'id_marca_producto': $('#marca').attr('data-id-marca')
  };
  
  operacionServidor("productos", "PUT", datos);
  $('#modalModificarProducto').modal('hide');
}

/**
 * Funcion utilizada para obtener la informacion de
 * un producto especifico
 * @param {string} id identificador de producto
 * @returns 
 */
function cargarProducto(id) {

  if (id === undefined) {
    
    var id = getUrlParameter('id');
  }
  
  if (id !== undefined ) {
  
    data = { id : id };
    $.ajax({
      url: URLSERVER + 'producto',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data),
      processData: false,
      contentType: 'application/json',
      CrossDomain:true,
      async: false,
      success: function (datos) {
        console.log(datos);
        $('#id').val(datos.id);
        $('#codigo').val(datos.codigo_producto);
        $('#nombre').val(datos.nombre_producto);
        $('#medida').val(datos.medida_producto);
        $('#cantidad').val(datos.cantidad_producto);
        $('#venta').val(datos.precio_venta_producto);
        $('#compra').val(datos.precio_neto_producto);

        $.get( URLSERVER + "marcas_productos", function( data ) {
          for(index in data) {
            var marca = data[index];
            if (marca.id === datos.id_marca_producto) {
              $('#marca').val(marca.nombre_marca_producto);
              $('#marca').attr('data-id-marca', datos.id_marca_producto);
                break;
            }
          };
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        $("#alertCargarProducto").show("slow");
      }
    });
  }
}

/**
 * Funcion utilizada para mostrar los datos de
 * un producto especifico
 * 
 * @param {int} id
 * @returns 
 */
function mostrarModalModificar(id) {
  
  if (id !== undefined ) {
  
    data = { id : id };
    $.ajax({
      url: URLSERVER + 'productos/' + id,
      type: 'GET',
      dataType: 'json',
      data: JSON.stringify(data),
      processData: false,
      contentType: 'application/json',
      CrossDomain: true,
      async: false,
      success: function (datos) {
        $.get( URLSERVER + "marcas_productos/" + datos.id_marca_producto, function( marca ) {
          
          $('#modalModificarProducto').modal('show');
          $('#id').val(datos.id);
          $('#codigo').val(datos.codigo_producto);
          $('#nombre').val(datos.nombre_producto);
          $('#medida').val(datos.medida_producto);
          $('#cantidad').val(datos.cantidad_producto);
          $('#venta').val(datos.precio_venta_producto);
          $('#compra').val(datos.precio_neto_producto);
          $('#marca').val(marca.nombre_marca_producto);
          $('#marca').attr('data-id-marca', datos.id_marca_producto);
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        $("#alertCargarProducto").show("slow");
      }
    });
  }
}

/**
 * Funcion que nos permite mostrar 
 * la ventana de dialogo para eliminar un producto determinado
 * @param {int} id
 * @param {object} event
 * @returns 
 */
function mostrarModalEliminar(id, event) {
  
    event.stopPropagation();
    $('#modalEliminarProducto').modal('show');
    $('#modalEliminarProducto').attr('data-id-producto', id);
}
  