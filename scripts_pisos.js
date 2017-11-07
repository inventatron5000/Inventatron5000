$(document).ready(function(){
    //Funcion para agregar un nuevo piso
    $("#form-agregarPiso").submit(function(data){
        //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!
        var numeroPiso = $(this).find("input[name='numeroPiso']").val();
        var direccionPiso =$(this).find("input[name='direccionPiso']").val();
        var str="Se dió de alta el piso "+numeroPiso;
        Materialize.toast(str,1500,'rounded');

        //Borrar datos y cerrar modal
        $(this).find("input[name='numeroPiso']").val("");
        $(this).find("input[name='direccionPiso']").val("");
        $("#agregarPiso").modal('close');
        return false;
    });

    //Buscar un piso para editarlo
    $("#form-buscarPiso").submit(function(evt){
        var numeroPiso = $(this).find("input[name='numeroPiso']").val();
        if(Math.random()<0.5){  //Existe
            var direccionPiso = "DATOS DE DB";  //Aqui asigno el valor obtenido de la db
            //Colocar los valores en el modal
            $("#editarPisoForm").find("input[name='numeroPiso']").val(numeroPiso);
            $("#editarPisoForm").find("label[for='numeroPiso']").attr("class","active");
            $("#editarPisoForm").find("input[name='direccionPiso']").val(direccionPiso);
            $("#editarPisoForm").find("label[for='direccionPiso']").attr("class","active");
            //Cerrar ste modal y mostrar e lotro
            $("#editarPiso").modal("close");
            $("#editarPisoForm").modal("open");
        }else{                  //No existe
            var stg = "No se encontró el piso \""+numeroPiso+"\"";
            Materialize.toast(stg,1500,'rounded');
            $("#editarPiso").modal("close");
        }
        return false;
    });
    //Editar un piso
    $("#form-editarPiso").submit(function(evt){
        var numeroPiso = $(this).find("input[name='numeroPiso']").val();
        var direccionPiso = $(this).find("input[name='direccionPiso']").val();
        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $("#editarPisoForm").modal("close");
        var stg = "Se editó el piso "+numeroPiso;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un piso y eliminarlo
    $("#form-eliminarPiso").submit(function(evt){
        var numeroPiso = $(this).find("input[name='numeroPiso']").val();
        if(Math.random()<0.5){
            $("#confirmarEliminar").find("span.numeroPiso").html(numeroPiso);
            $("#buscarPiso").modal("close");
            $("#confirmarEliminar").modal("open");
        }
        else{
            $("#buscarPiso").modal("close");
            var stg = "No se encontró el piso \""+numeroPiso+"\"";
            Materialize.toast(stg,1500,'rounded');
        }
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarPiso").click(function(evt){
        $("#confirmarEliminar").modal("close");
        //FUNCION PARA BORRAR EN LA DB
        var stg = "Se eliminó el piso "+$("#confirmarEliminar").find("span.numeroPiso").html();
        Materialize.toast(stg,2000,"rounded");
    });
});
