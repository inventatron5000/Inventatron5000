$(document).ready(function(){
    //Funcion para agregar un nuevo depa
    $("#form-agregarEquipo").submit(function(data){
        //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!
        var codigo =$(this).find("input[name='codigo']").val();
        var equipo = $(this).find("input[name='equipo']").val();
        var modelo =$(this).find("input[name='modelo']").val();
        var serie=$(this).find("input[name='serie']").val();
        var cantidad =$(this).find("input[name='cantidad']").val();
        var costoC =$(this).find("input[name='costoC']").val();
        var precioVen =$(this).find("input[name='precioVen']").val();
        var str="Se dió de alta el equipo "+ equipo;
        Materialize.toast(str,1500,'rounded');

        //Borrar datos y cerrar modal
        $(this).find("input[name='codigo']").val("");
        $(this).find("input[name='equipo']").val("");
        $(this).find("input[name='modelo']").val("");
        $(this).find("input[name='serie']").val("");
        $(this).find("input[name='cantidad']").val("");
        $(this).find("input[name='costoC']").val("");
        $(this).find("input[name='precioVen']").val("");
        $("#modal_agregar").modal('close');
        return false;
    });

    //Buscar un depa para editarlo
    $("#form-buscarEquipo").submit(function(evt){
        var buscarEquipo = $(this).find("input[name='buscarEquipo']").val();
        if(Math.random()<0.5){  //Existe
            var direccionPiso = "DATOS DE DB";  //Aqui asigno el valor obtenido de la db
            //Colocar los valores en el modal
            $("#editarEquipoForm").find("input[name='equipo']").val(buscarEquipo);
            $("#editarEquipoForm").find("label[for='equipo']").attr("class","active");
            //Cerrar ste modal y mostrar e lotro
            $("#editarEquipo").modal("close");
            $("#editarEquipoForm").modal("open");
        }else{                  //No existe
            var stg = "No se encontró el equipo \""+buscarEquipo+"\"";
            Materialize.toast(stg,1500,'rounded');
            $("#editarEquipo").modal("close");
        }
        return false;
    });
    //Editar un depa
    $("#form-editarEquipo").submit(function(evt){
        var codigo =$(this).find("input[name='codigo']").val();
        var equipo = $(this).find("input[name='equipo']").val();
        var modelo =$(this).find("input[name='modelo']").val();
        var serie=$(this).find("input[name='serie']").val();
        var cantidad =$(this).find("input[name='cantidad']").val();
        var costoC =$(this).find("input[name='costoC']").val();
        var precioVen =$(this).find("input[name='precioVen']").val();
        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $("#editarEquipoForm").modal("close");
        var stg = "Se editó el equipo "+equipo;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un piso y eliminarlo
    $("#form-eliminarEquipo").submit(function(evt){
        var buscarEquipo = $(this).find("input[name='buscarEquipo']").val();
        if(Math.random()<0.5){
            $("#confirmarEliminar").find("span.buscarEquipo").html(buscarEquipo);
            $("#modal_eliminar").modal("close");
            $("#confirmarEliminar").modal("open");
        }
        else{
            $("#modal_eliminar").modal("close");
            var stg = "No se encontró el equipo \""+buscarEquipo+"\"";
            Materialize.toast(stg,1500,'rounded');
        }
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarEquipo").click(function(evt){
        $("#confirmarEliminar").modal("close");
        //FUNCION PARA BORRAR EN LA DB
        var stg = "Se eliminó el equipo "+$("#confirmarEliminar").find("span.buscarEquipo").html();
        Materialize.toast(stg,2000,"rounded");
    });
});