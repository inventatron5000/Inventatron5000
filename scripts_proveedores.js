$(document).ready(function(){
    //listar proveedores
    mostrarProveedores();

    //Funcion para agregar un nuevo proveedor
    $("#form-agregarProveedor").submit(function(data){

        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var direccion = $(this).find("textarea[name='direccion']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();


        var str="Se dió de alta el proveedor "+nombreProveedor;

         $.ajax({ //nombrepr, personacontactopr, direccion, correo, telefono
            url:"php/proveedores.php",
            method:"post",
            data:{
                operacion:'A',
                nombreProveedor:nombreProveedor,
                personaContacto:personaContacto,
                direccion:direccion,
                telefono:telefono,
                correo:correo
            }
        }).done(function(data){
            if(data=="EXISTE")
                Materialize.toast("¡Ya existe ese proveedor!",2000,"rounded");
            else if(data=="OK"){
                Materialize.toast(str,2000,"rounded");
                mostrarProveedores();
            }
            else{
                Materialize.toast("Error inesperado",2000,"rounded");
                console.log(data)
            }
        });


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

        $.ajax({ //nombrepr, personacontactopr, direccion, correo, telefono
            url:"php/proveedores.php",
            method:"post",
            data:{
                operacion:'C',
                nombreProveedor:nombreProveedor
            }
        }).done(function(data){
            if(data=="NF"){
                var stg = "No se encontró el proveedor \""+nombreProveedor+"\"";
                Materialize.toast(stg,2000,'rounded');
                $("#editarProveedor").modal("close");
            }
            else{
                var datosProv = JSON.parse(data);
                $("#editarProveedorForm").find("input[name='nombreProveedor']").val(datosProv.nombrepr);
                $("#editarProveedorForm").find("label[for='nombreProveedor']").attr("class","active");

                $("#editarProveedorForm").find("input[name='personaContacto']").val(datosProv.personacontactopr);
                $("#editarProveedorForm").find("label[for='personaContacto']").attr("class","active");

                $("#editarProveedorForm").find("textarea[name='direccion']").val(datosProv.direccion);
                $("#editarProveedorForm").find("label[for='direccion']").attr("class","active");

                $("#editarProveedorForm").find("input[name='telefono']").val(datosProv.telefono);
                $("#editarProveedorForm").find("label[for='telefono']").attr("class","active");

                $("#editarProveedorForm").find("input[name='correo']").val(datosProv.correo);
                $("#editarProveedorForm").find("label[for='correo']").attr("class","active");

                //Cerrar ste modal y mostrar e lotro
                $("#editarProveedor").modal("close");
                $("#form-editarProveedor").attr("data-id",datosProv.nombrepr);
                $("#editarProveedorForm").modal("open");
            }
        });
        return false;
    });
    //Editar un proveedor
    $("#form-editarProveedor").submit(function(evt){
        var id= $(this).attr("data-id");
        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var direccion = $(this).find("textarea[name='direccion']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();

        $.ajax({
            url:"php/proveedores.php",
            method:"post",
            data:{
                operacion:'M',
                id:id,
                nombreProveedor:nombreProveedor,
                personaContacto:personaContacto,
                direccion:direccion,
                telefono:telefono,
                correo:correo
            }
        }).done(function(data){
            console.log(data);
            if(data=="NOK"){
                Materialize.toast("El nuevo nombre de proveedor ya existe",2000,"rounded");
                $("#form-editarProveedor").find("input[name='nombreCliente']").val("");
                $("#form-editarProveedor").find("input[name='nombreCliente']").focus();
            }else if(data=="OK"){
                var stg = "Se editó el proveedor "+id;
                Materialize.toast(stg,2000,'rounded');
                $("#editarProveedorForm").modal("close");
                mostrarProveedores();
            }
        });

        return false;
    });

    //Funcion para buscar un proveedor y eliminarlo
    $("#form-eliminarProveedor").submit(function(evt){
        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();

        $.ajax({
            url:"php/proveedores.php",
            method:"post",
            data:{
                operacion:'C',
                nombreProveedor:nombreProveedor
            }
        }).done(function(data){
            if(data!="NF"){
                $("#confirmarEliminar").find("span.nombreProveedor").html(nombreProveedor);
                $("#buscarProveedor").modal("close");
                $("#confirmarEliminar").modal("open");
            }
            else{
                $("#buscarProveedor").modal("close");
                var stg = "No se encontró el proveedor \""+nombreProveedor+"\"";
                Materialize.toast(stg,2000,'rounded');
            }
        });
        return false;
    });
    //Funcion para eliminar un proveedor
    $("#btnEliminarProveedor").click(function(evt){
        var nombreProveedor = $("#confirmarEliminar").find("span.nombreProveedor").html();
        $("#confirmarEliminar").modal("close");
        $.ajax({
            url:"php/proveedores.php",
            method:"post",
            data:{
                operacion:'B',
                nombreProveedor:nombreProveedor
            }
        }).done(function(x){
            console.log(x)
            if(x=="OK"){
                var stg = "Se eliminó el proveedor "+$("#confirmarEliminar").find("span.nombreProveedor").html();
                Materialize.toast(stg,2000,"rounded");
                mostrarProveedores();
            }
        });
    });

    //Funcion para buscar un proveedor y enviarle whats
    $("#form-enviarCorreo").submit(function(evt){
        var nombreProveedor = $(this).find("input[name='nombreProveedor']").val();
        $.ajax({
            url:"php/proveedores.php",
            method:"post",
            data:{
                operacion:'C',
                nombreProveedor:nombreProveedor
            }
        }).done(function(data){
            if(data!="NF"){
                var proveedor = JSON.parse(data);
                $("#cuerpoCorreo").find("input[name='nombreProveedor']").val(proveedor.nombrepr);
                $("#cuerpoCorreo").find("label[for='nombreProveedor']").attr("class","active");
                $("#cuerpoCorreo").find("input[name='correo']").val(proveedor.correo);
                $("#cuerpoCorreo").find("label[for='correo']").attr("class","active");
                $("#enviarCorreo").modal("close");
                $("#cuerpoCorreo").modal("open");
            }
            else{
                $("#enviarCorreo").modal("close");
                var stg = "No se encontró el proveedor \""+nombreProveedor+"\"";
                Materialize.toast(stg,2000,'rounded');
            }
        });


        return false;
    });
    //Funcion para enviar un correo
    $("#form-cuerpoCorreo").submit(function(evt){
        var correo = $(this).find("input[name='correo']").val();
        var asunto = $(this).find("input[name='asunto']").val();
        var mensaje = $(this).find("textarea[name='mensaje']").val();

        //AUN NO FUNCIONA BIEN
        $.ajax({
            url:"php/proveedores.php",
            method:"post",
            data:{
                operacion:"E",
                para:correo,
                mensaje:mensaje,
                titulo:asunto
            }
        }).done(function(data){
            if(data=="OK")
                Materialize.toast("Correo enviado al proveedor",2000,"rounded");
            else{
                Materialize.toast("Error al enviar el correo",2000,"rounded");
                console.log(data);
            }
        });
        $("#cuerpoCorreo").modal("close");
        return false;
    });
});

function mostrarProveedores(){
    $.ajax({
        url:"php/proveedores.php",
        method:"post",
        data:{
            operacion:'L'
        }
    }).done(function(data){
        if(data=="[]"){
            $("#contenidoPrincipal > div > table > tbody").html("");
            $("#contenidoPrincipal span.mensaje_error").html("No hay proveedores por mostrar");
        }
        else{
            $("#contenidoPrincipal span.mensaje_error").html("");
            var listaProv = JSON.parse(data);
            var tabla = "";
            for(var k in listaProv){
                tabla+="<tr><td data-title='Nombre del Proveedor'>"+listaProv[k].nombrepr+"</td>";
                tabla+="<td data-title='Nombre del Proveedor'>"+listaProv[k].direccion+"</td>";
                tabla+="<td data-title='Nombre del Proveedor'>"+listaProv[k].correo+"</td>";
                tabla+="<td data-title='Nombre del Proveedor'>"+listaProv[k].telefono+"</td></tr>";
            }
            $("#contenidoPrincipal > div > table > tbody").html(tabla);
        }

    });
}
