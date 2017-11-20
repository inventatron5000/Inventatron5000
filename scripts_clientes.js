$(document).ready(function(){
    //Mostrar clientes en la vista principal
    mostrarClientes();
    $("#contenidoPrincipal > div > table > tbody").delegate("tr","click",function(){
        var nombrecl = $(this).find("td").html();
        $.ajax({
            url:"php/clientes.php",
            method:"post",
            data:{
                operacion:'C',
                nombreCliente:nombrecl
            }
        }).done(function(data){
             var datosCliente = JSON.parse(data);

                var personaContacto = datosCliente.personacontactocl;
                var pais = datosCliente.pais;
                var estado = datosCliente.estado;
                var ciudad = datosCliente.ciudad;
                var cp = datosCliente.codpostal;
                var direccionFact = datosCliente.direccionfacturacion;
                var telefono = datosCliente.telefono;
                var correo = datosCliente.correo;

                //Colocar datos
                $("#mostrarCliente").find("input[name='nombreCliente']").val(nombrecl);
                $("#mostrarCliente").find("label[for='nombreCliente']").attr("class","active");

                $("#mostrarCliente").find("input[name='personaContacto']").val(personaContacto);
                $("#mostrarCliente").find("label[for='personaContacto']").attr("class","active");

                $("#mostrarCliente").find("input[name='pais']").val(pais);
                $("#mostrarCliente").find("label[for='pais']").attr("class","active");

                $("#mostrarCliente").find("input[name='estado']").val(estado);
                $("#mostrarCliente").find("label[for='estado']").attr("class","active");

                $("#mostrarCliente").find("input[name='ciudad']").val(ciudad);
                $("#mostrarCliente").find("label[for='ciudad']").attr("class","active");

                $("#mostrarCliente").find("input[name='cp']").val(cp);
                $("#mostrarCliente").find("label[for='cp']").attr("class","active");

                $("#mostrarCliente").find("textarea[name='direccionFact']").val(direccionFact);
                $("#mostrarCliente").find("label[for='direccionFact']").attr("class","active");

                $("#mostrarCliente").find("input[name='telefono']").val(telefono);
                $("#mostrarCliente").find("label[for='telefono']").attr("class","active");

                $("#mostrarCliente").find("input[name='correo']").val(correo);
                $("#mostrarCliente").find("label[for='correo']").attr("class","active");

                //Cerrar ste modal y mostrar e lotro
                $("#mostrarCliente").modal("open");
        });
    });
    //Funcion para agregar un nuevo piso
    $("#form-agregarCliente").submit(function(data){

        var nombreCliente = $(this).find("input[name='nombreCliente']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var pais = $(this).find("input[name='pais']").val();
        var estado = $(this).find("input[name='estado']").val();
        var ciudad = $(this).find("input[name='ciudad']").val();
        var cp = $(this).find("input[name='cp']").val();
        var direccionFact = $(this).find("textarea[name='direccionFact']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();

        var str="Se dió de alta el cliente "+nombreCliente;

        $.ajax({
            url:"php/clientes.php",
            method:"post",
            data:{
                operacion:'A',
                nombreCliente:nombreCliente,
                personaContacto:personaContacto,
                pais:pais,
                estado:estado,
                ciudad:ciudad,
                cp:cp,
                direccionFact:direccionFact,
                telefono:telefono,
                correo:correo
            }
        }).done(function(data){
            if(data=="EXISTE")
                Materialize.toast("¡Ya existe ese cliente!",2000,"rounded");
            else if(data=="OK"){
                Materialize.toast(str,2000,"rounded");
                mostrarClientes();
            }
            else
                Materialize.toast("Error inesperado",2000,"rounded");
        });



        //Borrar datos y cerrar modal
        $(this).find("input[name='nombreCliente']").val("");
        $(this).find("input[name='personaContacto']").val("");
        $(this).find("input[name='pais']").val("");
        $(this).find("input[name='estado']").val("");
        $(this).find("input[name='ciudad']").val("");
        $(this).find("input[name='cp']").val("");
        $(this).find("textarea[name='direccionFact']").val("");
        $(this).find("input[name='telefono']").val("");
        $(this).find("input[name='correo']").val("");
        $("#agregarCliente").modal('close');
        return false;
    });

    //Buscar un cliente para editarlo
    $("#form-buscarCliente").submit(function(evt){
        var nombreCliente = $(this).find("input[name='nombreCliente']").val();
        $.ajax({
            url:"php/clientes.php",
            method:"post",
            data:{
                operacion:'C',
                nombreCliente:nombreCliente
            }
        }).done(function(data){
            if(data=="NF"){
                Materialize.toast("404 alv",2000,'rounded');
            }else{
                var datosCliente = JSON.parse(data);

                var personaContacto = datosCliente.personacontactocl;
                var pais = datosCliente.pais;
                var estado = datosCliente.estado;
                var ciudad = datosCliente.ciudad;
                var cp = datosCliente.codpostal;
                var direccionFact = datosCliente.direccionfacturacion;
                var telefono = datosCliente.telefono;
                var correo = datosCliente.correo;

                //Colocar datos
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

                $("#editarClienteForm").find("textarea[name='direccionFact']").val(direccionFact);
                $("#editarClienteForm").find("label[for='direccionFact']").attr("class","active");

                $("#editarClienteForm").find("input[name='telefono']").val(telefono);
                $("#editarClienteForm").find("label[for='telefono']").attr("class","active");

                $("#editarClienteForm").find("input[name='correo']").val(correo);
                $("#editarClienteForm").find("label[for='correo']").attr("class","active");

                //Cerrar ste modal y mostrar e lotro
                $("#editarCliente").modal("close");
                $("#form-editarCliente").attr("data-id",nombreCliente);
                $("#editarClienteForm").modal("open");
            }
        });
        return false;
    });
    //Editar un cliente
    $("#form-editarCliente").submit(function(evt){
        var id= $(this).attr("data-id");
        var nombreCliente = $(this).find("input[name='nombreCliente']").val();
        var personaContacto = $(this).find("input[name='personaContacto']").val();
        var pais = $(this).find("input[name='pais']").val();
        var estado = $(this).find("input[name='estado']").val();
        var ciudad = $(this).find("input[name='ciudad']").val();
        var cp = $(this).find("input[name='cp']").val();
        var direccionFact = $(this).find("textarea[name='direccionFact']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var correo = $(this).find("input[name='correo']").val();

        $.ajax({
            url:"php/clientes.php",
            method:"post",
            data:{
                operacion:'M',
                id:id,
                nombreCliente:nombreCliente,
                personaContacto:personaContacto,
                pais:pais,
                estado:estado,
                ciudad:ciudad,
                cp:cp,
                direccionFact:direccionFact,
                telefono:telefono,
                correo:correo
            }
        }).done(function(data){
            console.log(data);
            if(data=="NOK"){
                Materialize.toast("El nuevo nombre de cliente ya existe",2000,"rounded");
                $("#form-editarCliente").find("input[name='nombreCliente']").val("");
                $("#form-editarCliente").find("input[name='nombreCliente']").focus();
            }else if(data=="OK"){
                var stg = "Se editó el cliente "+id;
                Materialize.toast(stg,2000,'rounded');
                $("#editarClienteForm").modal("close");
                mostrarClientes();
            }
        });
        return false;
    });

    //Funcion para buscar un piso y eliminarlo
    $("#form-eliminarCliente").submit(function(evt){
        var nombrecl = $(this).find("input[name='nombreCliente']").val();

        $.ajax({
            url:"php/clientes.php",
            method:"post",
            data:{
                operacion:'C',
                nombreCliente:nombrecl
            }
        }).done(function(data){
            if(data!="NF"){
                $("#confirmarEliminar").find("span.nombreCliente").html(nombrecl);
                $("#buscarCliente").modal("close");
                $("#confirmarEliminar").modal("open");
            }
            else{
                $("#buscarCliente").modal("close");
                var stg = "No se encontró el cliente \""+nombreCliente+"\"";
                Materialize.toast(stg,2000,'rounded');
            }
        });

        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarPiso").click(function(evt){
        var nombrecl = $("#confirmarEliminar").find("span.nombreCliente").html();
        $("#confirmarEliminar").modal("close");
        $.ajax({
            url:"php/clientes.php",
            method:"post",
            data:{
                operacion:'B',
                nombreCliente:nombrecl
            }
        }).done(function(x){
            if(x=="OK"){
                var stg = "Se eliminó el cliente "+$("#confirmarEliminar").find("span.nombreCliente").html();
                Materialize.toast(stg,2000,"rounded");
                mostrarClientes();
            }
        });
    });
});

function mostrarClientes(){
    $.ajax({
        url:"php/clientes.php",
        method:"post",
        data:{
            operacion:'L'
        }
    }).done(function(data){
        if(data=="[]")
            $("#contenidoPrincipal").append("No hay clientes por mostrar");
        else{
            var listaClientes = JSON.parse(data);
            var tabla = "";
            for(var k in listaClientes)
                tabla+="<tr><td data-title='Nombre del Cliente' contenteditable='false' class='btnVerCliente'>"+listaClientes[k].nombrecl+"</td></tr>";
            $("#contenidoPrincipal > div > table > tbody").html(tabla);
        }

    });
}
