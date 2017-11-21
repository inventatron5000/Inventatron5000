var listaEquipos;
$(document).ready(function(){
    //Funcion para agregar un nuevo pedido
    listaProveedores();
    listaPedidos();
    $("#form-pedir").submit(function(data){
        //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!
        var num_seguimiento = $(this).find("input[name='num_seguimiento']").val();
        var op_envio =$(this).find("input[name='op_envio']").val();
        var str="Se dió de alta el pedido "+num_seguimiento;
        Materialize.toast(str,1500,'rounded');

        //Borrar datos y cerrar modal
        $(this).find("input[name='num_seguimiento']").val("");
        $(this).find("input[name='op_envio']").val("");
        $("#pedirStock").modal('close');
        return false;
    });
    //Funcion recibir stock
     $("#form-recibirPedido").submit(function(data){
        //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!
        var num_seguimiento = $(this).find("input[name='num_seguimiento']").val();
        var str="Se recibio el pedido "+num_seguimiento;
        Materialize.toast(str,1500,'rounded');

        //Borrar datos y cerrar modal
        $(this).find("input[name='num_seguimiento']").val("");
        $("#recibirStock").modal('close');
        return false;
    });

    //Buscar un piso para editarlo
    $("#form-editarPedido").submit(function(evt){
        var num_seguimiento = $(this).find("input[name='num_seguimiento']").val();
        if(Math.random()<0.5){  //Existe
            var direccionPiso = "DATOS DE DB";  //Aqui asigno el valor obtenido de la db
            //Colocar los valores en el modal
            $("#editarStock").find("input[name='num_seguimiento']").val(num_seguimiento);
            $("#editarStock").find("label[for='num_seguimiento']").attr("class","active");
            //Cerrar ste modal y mostrar e lotro
            $("#editarPedido").modal("close");
            $("#editarStock").modal("open");
        }else{                  //No existe
            var stg = "No se encontró el pedido \""+num_seguimiento+"\"";
            Materialize.toast(stg,1500,'rounded');
            $("#editarPedido").modal("close");
        }
        return false;
    });
    //Editar un piso
    $("#form-editar").submit(function(evt){
        var num_seguimiento = $(this).find("input[name='num_seguimiento']").val();
        var op_envio =$(this).find("input[name='op_envio']").val();
        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $("#editarStock").modal("close");
        var stg = "Se editó el pedido "+num_seguimiento;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un pedido y eliminarlo
    $("form-eliminarPedido").submit(function(evt){
        var num_seguimiento = $(this).find("input[name='num_seguimiento']").val();
        if(Math.random()<0.5){
            $("#buscarPedido").modal("close");
            $("#cancelarPedido").modal("open");
        }
        else{
            $("#buscarPedido").modal("close");
            var stg = "No se encontró el pedido \""+ num_seguimiento+"\"";
            Materialize.toast(stg,1500,'rounded');
        }
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarPedido").click(function(evt){
        $("#cancelarPedido").modal("close");
        //FUNCION PARA BORRAR EN LA DB
        var stg = "Se eliminó el pedido ";
        Materialize.toast(stg,2000,"rounded");
    });

    $("#btnAgregarEquipo-pedir").click(function(evt){
        if($("table.listaEquipos > tbody").children().length==0){
            var elem = "<tr><td data-title='Equipo'><select>";
            for(var i in listaEquipos)//Codigo,equipo,costo,
                elem+="<option value='"+listaEquipos[i].codigo+"'>"+listaEquipos[i].equipo+"</option>";
            elem+="</select></td>";
            for(var i in listaEquipos){//Codigo,equipo,costo,
                elem+="<td data-title='Precio'>"+listaEquipos[i].costo+"</td>";
                elem+="<td data-title='Cantidad' contenteditable='true'>1</td>";
            }
            elem+="</tr>";
            $("table.listaEquipos > tbody").html(elem);
            $("select").material_select();
        }
        else{
            var row = $("table.listaEquipos > tbody").first().html();
            row = "<tr>"+row+"</tr>";
            $("table.listaEquipos > tbody").append(row);
            $("select").material_select();
        }
    });
});

function listaProveedores(){
    $.ajax({
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:"LPR"
        }
    }).done(function(data){
        if(data!="[]"){
            var listaProveedores = JSON.parse(data);
            var opciones = "<option value='x' disabled selected>Seleccionar un Proveedor</option>";
            for(var i in listaProveedores)
                opciones+="<option value='"+listaProveedores[i].nombrepr+"'>"+listaProveedores[i].nombrepr+"</option>";
            $("#select_proveedor").html(opciones);
            $("#select_proveedor").material_select();
            $("#select_proveedor").change(function(){
                var prov = $("#select_proveedor > option:selected").text();

            });
        }else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
        }
    });
}

function listaEquipos(proveedor){
    $.ajax({
        url:"php/stock.php",
        method:"post",
        data:{
            operacion:"EP",
            proveedor:proveedor
        }
    }).done(function(data){//Codigo,equipo,costo,
        listaEquipos = new Object();
        if(data!="[]"){
            var equipos = JSON.parse(data);
            for(var i in equipos)
                listaEquipos.push({"codigo":equipos[i].codigo,"equipo":equipos[i].equipo,"precio":equipos[i].costo});
        }
    });
}

function listaPedidos(){
    $.ajax({
        url:"php/stock.php",
        method:"post",
        data:{
            operacion:"L",
        }
    }).done(function(data){//fechaemision,nopedido,proveedor,importe,estado
        $("#contenidoPrincipal").children("span.msj_error").html("");
        console.log(data)
        if(data!="[]"){
            var equipos = JSON.parse(data);
            var tabla ="";
            for(var i in equipos){
                tabla+="<tr><td data-title='Fecha de Emisión'>"+equipos[i].fechaemision+"</td>";
                tabla+="<td data-title='No. Pedido'>"+equipos[i].nopedido+"</td>";
                tabla+="<td data-title='Proveedor'>"+equipos[i].proveedor+"</td>";
                tabla+="<td data-title='Importe'>"+equipos[i].importe+"</td>";
                tabla+="<td data-title='Estado'>"+equipos[i].estado+"</td>";
            }
        }else{
            $("#contenidoPrincipal").children("span.msj_error").html("No hay pedidos que mostrar");
        }
    });
}
