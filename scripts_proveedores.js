$(document).ready(function(){
    //Funcion para agregar un nuevo piso
    $("#form-agregarProveedor").submit(function(data){

        var nombreCliente = $(this).find("input[name='agregarProveedor']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var direccion = $(this).find("textarea[name='direccion']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();
        var str="Se dió de alta el cliente "+nombreCliente;

         //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!

        Materialize.toast(str,2000,'rounded');

        //Borrar datos y cerrar modal
        $(this).find("input[name='nombreCliente']").val("");
        $(this).find("input[name='personaContacto']").val("");
        $(this).find("textarea[name='']").val("");
        $(this).find("input[name='telefono']").val("");
        $(this).find("input[name='correo']").val("");
        $("#agregarCliente").modal('close');
        return false;
    });

    //Buscar un cliente para editarlo
    $("#form-buscarProveedor").submit(function(evt){
        var nombreCliente = $(this).find("input[name='nombreProveedor']").val();
        var personaContacto = "Walter White";
        var direccion = "308 Negra Arroyo Lane, Albuquerque, New Mexico";
        var telefono = "32142134";
        var correo = "adf@rewqwer";
        if(Math.random()<0.5){  //Existe
            //Colocar los valores en el modal
            $("#editarClienteForm").find("input[name='nombreCliente']").val(nombreCliente);
            $("#editarClienteForm").find("label[for='nombreCliente']").attr("class","active");

            $("#editarClienteForm").find("input[name='personaContacto']").val(personaContacto);
            $("#editarClienteForm").find("label[for='personaContacto']").attr("class","active");

            $("#editarClienteForm").find("input[name='pais']").val(pais);
            $("#editarClienteForm").find("label[for='pais']").attr("class","active");

            $("#editarClienteForm").find("input[name='estado']").val(estado);
            $("#editarClienteForm").find("label[for='estado']").attr("class","active");

            $("#editarClienteForm").find("input[name='ciudad']").val(ciudad);
            $("#editarClienteForm").find("label[for='ciudad']").attr("class","active");

            $("#editarClienteForm").find("input[name='cp']").val(cp);
            $("#editarClienteForm").find("label[for='cp']").attr("class","active");

            $("#editarClienteForm").find("textarea[name='direccion']").val(direccion);
            $("#editarClienteForm").find("label[for='direccion']").attr("class","active");

            $("#editarClienteForm").find("input[name='telefono']").val(telefono);
            $("#editarClienteForm").find("label[for='telefono']").attr("class","active");

            $("#editarClienteForm").find("input[name='correo']").val(correo);
            $("#editarClienteForm").find("label[for='correo']").attr("class","active");

            //Cerrar ste modal y mostrar e lotro
            $("#editarCliente").modal("close");
            $("#editarClienteForm").modal("open");
        }else{                  //No existe
            var stg = "No se encontró el cliente \""+nombreCliente+"\"";
            Materialize.toast(stg,2000,'rounded');
            $("#editarCliente").modal("close");
        }
        return false;
    });
    //Editar un piso
    $("#form-editarCliente").submit(function(evt){
        var nombreCliente = $(this).find("input[name='nombreCliente']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var pais = $(this).find("input[name='pais']").val();
        var estado = $(this).find("input[name='estado']").val();
        var ciudad = $(this).find("input[name='ciudad']").val();
        var cp = $(this).find("input[name='cp']").val();
        var direccion = $(this).find("textarea[name='direccion']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();

        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $("#editarClienteForm").modal("close");
        var stg = "Se editó el cliente "+numeroPiso;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un piso y eliminarlo
    $("#form-eliminarCliente").submit(function(evt){
        var nombreCliente = $(this).find("input[name='nombreCliente']").val();
        if(Math.random()<0.5){
            $("#confirmarEliminar").find("span.nombreCliente").html(nombreCliente);
            $("#buscarCliente").modal("close");
            $("#confirmarEliminar").modal("open");
        }
        else{
            $("#buscarCliente").modal("close");
            var stg = "No se encontró el cliente \""+nombreCliente+"\"";
            Materialize.toast(stg,2000,'rounded');
        }
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarPiso").click(function(evt){
        $("#confirmarEliminar").modal("close");
        //FUNCION PARA BORRAR EN LA DB
        var stg = "Se eliminó el cliente "+$("#confirmarEliminar").find("span.nombreCliente").html();
        Materialize.toast(stg,2000,"rounded");
    });
});
