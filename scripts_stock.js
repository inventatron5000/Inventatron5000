$(document).ready(function(){
    //Funcion para agregar un nuevo pedido
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
});