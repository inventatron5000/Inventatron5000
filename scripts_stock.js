var listaEquipos;
$(document).ready(function(){
    //Funcion para agregar un nuevo pedido
    listaPedidos();
    listaProveedores();
    listaPisos();
    $("#select_proveedor").change(function(){
        var prov = $("#select_proveedor > option:selected").text();
        listarEquipos(prov);
    });
    listaPedidos();
    $("#form-pedir").submit(function(data){
        //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!
        var proveedor = $("#select_proveedor").val();
        var piso = $("#select_piso").val();
        var fechaEmision = $(this).find("input[name='fechaEmision']").val();
        var fechaRecibes = $(this).find("input[name='fechaRecibes']").val();
        var num_seguimiento = $(this).find("input[name='num_seguimiento']").val();
        var op_envio =$(this).find("input[name='op_envio']").val();
        var equipo = [];
        var cantidad = [];
        var precio = [];
        var equiposCP = [];
        $("table.listaEquipos select").each(function(){
            equipo.push($(this).val());
            precio.push($(this).parent().parent().parent().children("td[data-title='Precio']").html());
            cantidad.push($(this).parent().parent().parent().children("td[data-title='Cantidad']").html());
        });
        for(var i=0;i<equipo.length;i++){
            var c=parseInt(cantidad[i]);
            for(var j=i+1;j<equipo.length;j++){
                if(equipo[i]==equipo[j] && equipo[j]!=""){
                    c+=parseInt(cantidad[j]);
                    cantidad[j]=0;
                    equipo[j]="";
                }
            }
            if(equipo[i]!="")
                equiposCP.push({"codigo":equipo[i],"cantidad":c,"precio":precio[i]});
        }
        var str="Se dió de alta el pedido "+num_seguimiento;
        Materialize.toast(str,1500,'rounded');
        $.ajax({
            url:"php/stock.php",
            method:"post",
            data:{
                operacion:"N"
            }
        }).done(function(data){
            console.log(data);
            var k = data;
            for(var i in equiposCP){
                $.ajax({
                    url:"php/stock.php",
                    method:"post",
                    data:{
                        operacion:"AP",
                        numPedido:k,
                        proveedor:proveedor,
                        fechaRecibes:fechaRecibes,
                        fechaEmision:fechaEmision,
                        num_seguimiento:num_seguimiento,
                        piso:piso,
                        op_envio:op_envio,
                        codequipo:equiposCP[i].codigo,
                        cantidadsol:equiposCP[i].cantidad,
                        estado:"En ruta"
                    }
                }).done(function(x){
                    console.log(x)
                });
            }
            listaPedidos();
        });


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

    //Buscar un pedido para editarlo
    $("#form-editarPedido").submit(function(evt){
        var nopedido = $(this).find("input[name='nopedido']").val();
        $.ajax({
            url:"php/stock.php",
            method:"post",
            data:{
                operacion:"E",
                nopedido:nopedido
            }
        }).done(function(data){
            if(data!="[]"){
                console.log(data);
                var pedido = JSON.parse(data);
                $("#editarStock").find("input[name='nombreProveedor']").val(pedido[0].proveedor);
                $("#editarStock").find("label[for='nombreProveedor']").attr("class","active");
                $("#editarStock").find("select[name='select_piso'] > option[value='"+pedido[0].piso+"']").attr("selected","selected");

                $("#editarStock").find("input[name='fechaEmision']").val(pedido[0].fechaemision);
                $("#editarStock").find("label[for='fechaEmision']").attr("class","active");

                $("#editarStock").find("input[name='fechaRecibes']").val(pedido[0].fecharecibo);
                $("#editarStock").find("label[for='fechaRecibes']").attr("class","active");

                $("#editarStock").find("input[name='num_seguimiento']").val(pedido[0].noseguimiento);
                $("#editarStock").find("label[for='num_seguimiento']").attr("class","active");

                $("#editarStock").find("input[name='op_envio']").val(pedido[0].oppaq);
                $("#editarStock").find("label[for='op_envio']").attr("class","active");

                $("#editarStock").find("input[name='num_seguimiento']").val(pedido[0].noseguimiento);
                $("#editarStock").find("label[for='num_seguimiento']").attr("class","active");
                $("#editarStock").find("form").attr("data-numpedido",nopedido)
                tabla="";
                for(var i in pedido){
                    tabla+="<tr><td data-title='Equipo'>"+pedido[i].codequipo+"</td>";
                    tabla+="<td data-title='Cantidad' contenteditable='true'>"+pedido[i].cantidadsol+"</td></tr>";
                }
                $("#editarStock").find("table.listaEquipos > tbody").html(tabla);
                $("#editarStock").modal("open");
            }
            else{
                var stg = "No se encontró el pedido \""+nopedido+"\"";
                Materialize.toast(stg,2000,'rounded');
                $("#editarPedido").modal("close");
            }
        });
        return false;
    });
    //Editar un pedido
    $("#form-editar").submit(function(evt){
        var num_pedido = $(this).attr("data-numpedido");

        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        var equipos = [];
        $(this).find("table.listaEquipos td[data-title='Cantidad']").each(function(){
            equipos.push({"codigo":$(this).parent().children("td[data-title='Equipo']").html(),"cantidad":$(this).html()});
        });
        for(var i in equipos){
            $.ajax({
                url:"php/stock.php",
                method:"post",
                data:{
                    operacion:"M",
                    cantidad:equipos[i].cantidad,
                    codigo:equipos[i].codigo,
                    nopedido:num_pedido
                }
            }).done(function(data){
                console.log(data)
            });
        }
        listaPedidos();
        $(".modal").modal("close");
        var stg = "Se editó el pedido "+num_pedido;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un pedido y eliminarlo
    $("#form-eliminarPedido").submit(function(evt){
        var noPedido = $(this).find("input[name='noPedido']").val();
        $.ajax({
            url:"php/stock.php",
            method:"post",
            data:{
                operacion:"B",
                noPedido:noPedido
            }
        }).done(function(data){
            console.log(data);
            if(data!="NOK"){
                $("#cancelarPedido").find("span.nopedido").html(noPedido);
                $("#cancelarPedido").find("span.cant").html(data);
                $("#cancelarPedido").modal("open");
            }
            else{
                Materialize.toast("No se encontró el pedido",2000,"rounded");
            }
        });
        $("#buscarPedido").modal("close");
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarPedido").click(function(evt){
        $("#cancelarPedido").modal("close");
        var num = $("#cancelarPedido").find("span.nopedido").html();
        $.ajax({
            url:"php/stock.php",
            method:"post",
            data:{
                operacion:"CA",
                nopedido : num
            }
        }).done(function(data){
            console.log(data);
            listaPedidos();
        });
        var stg = "Se canceló el pedido "+num;
        Materialize.toast(stg,2000,"rounded");
    });

    //Agregar fila a la tabla de equipos para pedir
    $("#btnAgregarEquipo-pedir").click(function(evt){
        if($("table.listaEquipos > tbody").children().length==0){
            var elem = "<tr><td data-title='Equipo'><select>";
            for(var i in listaEquipos)//Codigo,equipo,costo,
                elem+="<option value='"+listaEquipos[i].codigo+"'>"+listaEquipos[i].equipo+"</option>";
                elem+="</select></td>";
                elem+="<td data-title='Cantidad' contenteditable='true'>1</td>";
                elem+="<td data-title='Precio'>"+listaEquipos["0"].costocompra+"</td>";
                elem+="</tr>";
                $("table.listaEquipos > tbody").html(elem);
                $("select").material_select();
                $("select").change(function(){
                var codigo = $(this).val();
                var precio = precioEquipo(codigo);
                $(this).parent().parent().parent().children("td[data-title='Precio']").html(precio);
            });
        }
        else{
            var row = $("table.listaEquipos > tbody > tr:first").html();
            row = "<tr>"+row+"</tr>";
            $("table.listaEquipos > tbody").append(row);
            $("select").material_select();
            $("select").change(function(){
                var codigo = $(this).val();
                var precio = precioEquipo(codigo);
                $(this).parent().parent().parent().children("td[data-title='Precio']").html(precio);
            });
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
        }else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
        }
    });
}

function listarEquipos(proveedor){
    $.ajax({
        url:"php/stock.php",
        method:"post",
        data:{
            operacion:"EP",
            proveedor:proveedor
        }
    }).done(function(data){//Codigo,equipo,costo
        $("table.listaEquipos > tbody").html("");
        listaEquipos = [];
        if(data!="[]"){
            var equipos = JSON.parse(data);
            for(var i in equipos)
                listaEquipos.push({"codigo":equipos[i].codigo,"equipo":equipos[i].equipo,"costocompra":equipos[i].costocompra});
            $("#select_proveedor").change(function(){
                var prov = $("#select_proveedor > option:selected").text();
                listarEquipos(prov);
            });
        }

    });

}

function precioEquipo(codigo){
    for(var i in listaEquipos){
        if(codigo==listaEquipos[i].codigo)
            return listaEquipos[i].costocompra;
    }
}

function listaPedidos(){
    $.ajax({
        url:"php/stock.php",
        method:"post",
        data:{
            operacion:"L",
        }
    }).done(function(data){//fechaemision,nopedido,proveedor,importe,estado
        console.log(data);
        if(data!="[]"){
            $("#contenidoPrincipal").children("span.msj_error").html("");
            var equipos = JSON.parse(data);
            var tabla ="";
            $("#contenidoPrincipal > div > table > tbody").html("");
            for(var i in equipos){
                tabla+="<tr><td data-title='Fecha de Emisión'>"+equipos[i].fechaemision+"</td>";
                tabla+="<td data-title='No. Pedido'>"+equipos[i].nopedido+"</td>";
                tabla+="<td data-title='Proveedor'>"+equipos[i].proveedor+"</td>";
                tabla+="<td data-title='Proveedor'>"+equipos[i].codequipo+"</td>";
                tabla+="<td data-title='Proveedor'>"+equipos[i].cantidadsol+"</td>";
                tabla+="<td data-title='Importe'>"+equipos[i].importe+"</td>";
                tabla+="<td data-title='Estado'>"+equipos[i].estado+"</td>";
            }
            $("#contenidoPrincipal > div > table > tbody").html(tabla);
        }else{
            $("#contenidoPrincipal").children("span.msj_error").html("No hay pedidos que mostrar");
        }
    });
}

function listaPisos(){
    $.ajax({
        url:"php/pisos.php",
        method:"post",
        data:{
            operacion:"L"
        }
    }).done(function(data){
        if(data!="[]"){
            var listaPisos = JSON.parse(data);
            var opciones = "<option value='x' disabled>Seleccionar un Piso</option>";
            for(var i in listaPisos)
                opciones+="<option value='"+listaPisos[i].direccionpiso+"'>"+listaPisos[i].direccionpiso+"</option>";
            $("select[name='select_piso']").html(opciones);
            $("select[name='select_piso']").material_select();
        }
    });
}
