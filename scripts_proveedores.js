$(document).ready(function(){
    //Funcion para agregar un nuevo proveedor
    $("#form-agregarProveedor").submit(function(data){

        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var direccion = $(this).find("textarea[name='direccion']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();
        var str="Se dió de alta el proveedor "+nombreProveedor;

         //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!

        Materialize.toast(str,2000,'rounded');

        //Borrar datos y cerrar modal
        $(this).find("input[name='nombreProveedor']").val("");
        $(this).find("input[name='personaContacto']").val("");
        $(this).find("textarea[name='direccion']").val("");
        $(this).find("input[name='telefono']").val("");
        $(this).find("input[name='correo']").val("");
        $("#agregarProveedor").modal('close');
        return false;
    });
    //Buscar un proveedor para editarlo
    $("#form-buscarProveedor").submit(function(evt){
        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        var personaContacto = "Walter White";
        var direccion = "308 Negra Arroyo Lane, Albuquerque, New Mexico";
        var telefono = "32142134";
        var correo = "adf@rewqwer";
        if(Math.random()<0.5 || true){  //Existe
            //Colocar los valores en el modal
            $("#editarProveedorForm").find("input[name='nombreProveedor']").val(nombreProveedor);
            $("#editarProveedorForm").find("label[for='nombreProveedor']").attr("class","active");

            $("#editarProveedorForm").find("input[name='personaContacto']").val(personaContacto);
            $("#editarProveedorForm").find("label[for='personaContacto']").attr("class","active");

            $("#editarProveedorForm").find("textarea[name='direccion']").val(direccion);
            $("#editarProveedorForm").find("label[for='direccion']").attr("class","active");

            $("#editarProveedorForm").find("input[name='telefono']").val(telefono);
            $("#editarProveedorForm").find("label[for='telefono']").attr("class","active");

            $("#editarProveedorForm").find("input[name='correo']").val(correo);
            $("#editarProveedorForm").find("label[for='correo']").attr("class","active");

            //Cerrar ste modal y mostrar e lotro
            $("#editarProveedor").modal("close");
            $("#editarProveedorForm").modal("open");
        }else{                  //No existe
            var stg = "No se encontró el proveedor \""+nombreProveedor+"\"";
            Materialize.toast(stg,2000,'rounded');
            $("#editarProveedor").modal("close");
        }
        return false;
    });
    //Editar un proveedor
    $("#form-editarProveedor").submit(function(evt){
        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var direccion = $(this).find("textarea[name='direccion']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();

        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $("#editarProveedorForm").modal("close");
        var stg = "Se editó el proveedor "+numeroPiso;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un proveedor y eliminarlo
    $("#form-eliminarProveedor").submit(function(evt){
        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        if(Math.random()<0.5 || true){
            $("#confirmarEliminar").find("span.nombreProveedor").html(nombreProveedor);
            $("#buscarProveedor").modal("close");
            $("#confirmarEliminar").modal("open");
        }
        else{
            $("#buscarProveedor").modal("close");
            var stg = "No se encontró el proveedor \""+nombreProveedor+"\"";
            Materialize.toast(stg,2000,'rounded');
        }
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarProveedor").click(function(evt){
        $("#confirmarEliminar").modal("close");
        //FUNCION PARA BORRAR EN LA DB
        var stg = "Se eliminó el proveedor "+$("#confirmarEliminar").find("span.nombreProveedor").html();
        Materialize.toast(stg,2000,"rounded");
    });

    //Funcion para buscar un proveedor y enviarle whats
    $("#form-enviarCorreo").submit(function(evt){
        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        var correo = "superman_me_la_pela@waynetech.sep.gob.mx";
        if(Math.random()<0.5 || true){
            $("#cuerpoCorreo").find("input[name='nombreProveedor']").val(nombreProveedor);
            $("#cuerpoCorreo").find("label[for='nombreProveedor']").attr("class","active");
            $("#cuerpoCorreo").find("input[name='correo']").val(correo);
            $("#cuerpoCorreo").find("label[for='correo']").attr("class","active");
            $("#enviarCorreo").modal("close");
            $("#cuerpoCorreo").modal("open");
        }
        else{
            $("#enviarCorreo").modal("close");
            var stg = "No se encontró el proveedor \""+nombreProveedor+"\"";
            Materialize.toast(stg,2000,'rounded');
        }
        return false;
    });
    //Funcion para enviar un correo
    $("#form-cuerpoCorreo").submit(function(evt){
        var correo = $(this).find("input[name='correo']").val();
        var asunto = $(this).find("input[name='asunto']").val();
        var mensaje = $(this).find("textarea[name='mensaje']").val();
        //Funcion mahica para enviar correo
        $("#cuerpoCorreo").modal("close");
        var stg = "Se envió un correo a "+correo;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });
});
