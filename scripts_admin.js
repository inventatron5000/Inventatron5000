$(document).ready(function(){
    $("#form-agregarUsuario").submit(function(evt){
        var nombre = $(this).find("input[name='nombre']").val();
        var apPaterno = $(this).find("input[name='apPaterno']").val();
        var apMaterno = $(this).find("input[name='apMaterno']").val();
        var hospital = $(this).find("input[name='hospital']").val();
        var correo = $(this).find("input[name='correo']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var usuario = $(this).find("input[name='usuario']").val();
        var contraseña = $(this).find("input[name='contraseña']").val();
        var rol = $(this).find("select[name='rol'] option:selected").text();

        //Funcion de agregar rol

        //Verificar nombre de usuario
        $("#agregarUsuario").modal('close');
        Materialize.toast("Se dió de alta al "+rol+" "+nombre,2000,'rounded');
        return false;
    });

    //Buscar usuario para editar
    $("#form-buscarUsuario").submit(function(evt){
        var tipoBusqueda = $(this).find("input[name='tipoBusqueda']:checked").val();
        var termino = $(this).find("input[name='busqueda']").val();



        //buscar usuario
        var nombre = "Walter";
        var apPaterno = "White";
        var apMaterno = "Whitman"
        var hospital = "Lomas Azules";
        var correo = "not_heisenberg@carwash.com";
        var telefono = "321467";
        var usuario = "WW";
        var rol = "ASDF";

        $("#form-editarUsuarioForm").find("input[name='nombre']").val(nombre);
        $("#form-editarUsuarioForm").find("label[for='nombre']").attr("class","active");

        $("#form-editarUsuarioForm").find("input[name='apPaterno']").val(apPaterno);
        $("#form-editarUsuarioForm").find("label[for='apPaterno']").attr("class","active");

        $("#form-editarUsuarioForm").find("input[name='apMaterno']").val(apMaterno);
        $("#form-editarUsuarioForm").find("label[for='apMaterno']").attr("class","active");

        $("#form-editarUsuarioForm").find("input[name='hospital']").val(hospital);
        $("#form-editarUsuarioForm").find("label[for='hospital']").attr("class","active");

        $("#form-editarUsuarioForm").find("input[name='correo']").val(correo);
        $("#form-editarUsuarioForm").find("label[for='correo']").attr("class","active");

        $("#form-editarUsuarioForm").find("input[name='telefono']").val(telefono);
        $("#form-editarUsuarioForm").find("label[for='telefono']").attr("class","active");

        $("#form-editarUsuarioForm").find("input[name='usuario']").val(usuario);
        $("#form-editarUsuarioForm").find("label[for='usuario']").attr("class","active");


        $("#editarUsuario").modal('close');
        $("#editarUsuarioForm").modal('open');
        return false;
    });
    //Editar Usuario
    $("#form-editarUsuarioForm").submit(function(evt){
        var nombre = $(this).find("input[name='nombre']").val();
        var apPaterno = $(this).find("input[name='apPaterno']").val();
        var apMaterno = $(this).find("input[name='apMaterno']").val();
        var hospital = $(this).find("input[name='hospital']").val();
        var correo = $(this).find("input[name='correo']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var usuario = $(this).find("input[name='usuario']").val();
        var contraseña = $(this).find("input[name='contraseña']").val();
        var rol = $(this).find("select[name='rol'] option:selected").text();

        //Funcion de agregar rol

        //Verificar nombre de usuario

        Materialize.toast("Se de actualizó el usuario "+nombre,2000,'rounded');
        return false;
    });

    //Buscar usuario para eliminar
    $("#form-eliminarUsuario").submit(function(evt){
        var tipoBusqueda = $(this).find("input[name='tipoBusqueda']:checked").val();
        var termino = $(this).find("input[name='busqueda']").val();

        var rol = "Biomedico";
        var nombre = "Michael James Ross";
        //BUSCAR USUARIO EN BD

        $("#confirmarEliminar").find("span.rol").html(rol);
        $("#confirmarEliminar").find("span.nombre").html(nombre);

        $("#buscarUsuario").modal("close");
        $("#confirmarEliminar").modal("open");
        return false;
    });
    //Eliminar alv
    $("#btnEliminarUsuario").click(function(evt){
        var rol = $("#confirmarEliminar").find("span.rol").html();
        var nom = $("#confirmarEliminar").find("span.nombre").html();
        $("#confirmarEliminar").modal("close");
        Materialize.toast("Se borró el "+rol+" "+nom,2000,"rounded");
    });
    //Buscar usuario para cambiar su contraseña
    $("#form-cambiarPass").submit(function(evt){
        var tipoBusqueda = $(this).find("input[name='tipoBusqueda']:checked").val();
        var termino = $(this).find("input[name='busqueda']").val();

        //BUSCAR USUARIO

        var nombreCompleto = "Steve Rogers";
        $("#cambiarPass-form").find("input[name='nombreCompleto']").val(nombreCompleto);
        $("#cambiarPass-form").find("label[for='nombreCompleto']").attr("class","active");
        $("#cambiarPass").modal("close");
        $("#cambiarPass-form").modal("open");
        return false;
    });
    //Cambiar contraseña
    $("#cambiarPass-form").submit(function(evt){

        var nombre = $(this).find("input[name='nombreCompleto']").val().split(" ")[0];
        var contraseña = $(this).find("input[name='contraseña']").val();
        var confirmarContraseña = $(this).find("input[name='confirmarContraseña']").val();

        console.log(contraseña+":::"+confirmarContraseña);
        if(contraseña == confirmarContraseña){
            //CAMBIAR CONTRASEÑA
            $("#cambiarPass-form").modal("close");
            Materialize.toast("Se actualizó la contraseña del usuario "+nombre,2000,"rounded");
        }else
            Materialize.toast("ERROR! Las contraseñas no coinciden",2000,"rounded");
        return false;
    });
});
