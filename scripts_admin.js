var rol="1";
$(document).ready(function(){
    mostrarUsuarios();
    var rol="1"
    var nombre="1";
    var usuario="1";
    $("#form-agregarUsuario").submit(function(evt){
        var nombre = $(this).find("input[name='nombre']").val();
        var apPaterno = $(this).find("input[name='apPaterno']").val();
        var apMaterno = $(this).find("input[name='apMaterno']").val();
        var hospital = $(this).find("input[name='hospital']").val();
        var correo = $(this).find("input[name='correo']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var usuario = $(this).find("input[name='usuario']").val();
        var contraseña = $(this).find("input[name='contraseña']").val();
        var rol = $(this).find("select[name='rol'] option:selected").val();

        //Funcion de agregar rol
        $.ajax({
            url:"php/admin.php",
            method:"post",
            data:{
                operacion:'A',
                nomusuario:usuario,
                contra:contraseña,
                nombre:nombre,
                appaterno:apPaterno,
                apmaterno:apMaterno,
                correo:correo,
                telefono:telefono,
                hospitalsede:hospital,
                rol:rol
            }
        }).done(function(data){
            if(data.substring(0,1)=="E")
                Materialize.toast("¡Ya existe ese usuario!",2000,"rounded");
            else{
            if(data.substring(0,1)=="O"){
                Materialize.toast(str,2000,"rounded");
            }
            else
                Materialize.toast("Error inesperado",2000,"rounded");
                
            } 
        });
        

        //Borrar datos y cerrar modal
        $(this).find("input[name='nombre']").val("");
        $(this).find("input[name='apPaterno']").val("");
        //var departamento= $( "#select_departamento option:selected" ).text();
        //var area= $( "#select_area option:selected" ).text();
        $(this).find("input[name='apMaterno']").val("");
        $(this).find("input[name='hospital']").val("");
        $(this).find("input[name='correo']").val("");
        $(this).find("input[name='telefono']").val("");
        //var piso= $( "#select_piso option:selected" ).text();
        $(this).find("input[name='usuario']").val("");
        $(this).find("input[name='contraseña']").val("");
        $("#agregarUsuario").modal('close');
        mostrarUsuarios();
        return false;
       
    });

    //Buscar usuario para editar
    $("#form-buscarUsuario").submit(function(evt){
        var nombre="1";
        var usuario="1";
        if($('input:radio[name=tipoBusqueda]:checked').val()=="user") { 
            usuario=$(this).find("input[name='busqueda']").val();
        }
        if($('input:radio[name=tipoBusqueda]:checked').val()=="nombre") { 
            nombre=$(this).find("input[name='busqueda']").val();
        }
        $.ajax({
            url:"php/admin.php",
            method:"post",
            data:{
                operacion:'C',
                nombre:nombre,
                nomusuario:usuario
            }
        }).done(function(data){
            if(data.substring(0,1)=="N"){
                Materialize.toast("404 alv",2000,'rounded');
            }else{
                var datosUsuario= JSON.parse(data);
                var nomusuario = datosUsuario.nomusuario;
                var contra = datosUsuario.contra;
                var nombre = datosUsuario.nombre;
                var appaterno = datosUsuario.appaterno;
                var apmaterno = datosUsuario.apmaterno;
                var correo = datosUsuario.correo;
                var telefono = datosUsuario.telefono;
                var hospitalsede = datosUsuario.hospitalsede;
                rol = datosUsuario.rol;

                $("#form-editarUsuarioForm").find("input[name='nombre']").val(nombre);
                $("#form-editarUsuarioForm").find("label[for='nombre']").attr("class","active");

                $("#form-editarUsuarioForm").find("input[name='apPaterno']").val(appaterno);
                $("#form-editarUsuarioForm").find("label[for='apPaterno']").attr("class","active");

                $("#form-editarUsuarioForm").find("input[name='apMaterno']").val(apmaterno);
                $("#form-editarUsuarioForm").find("label[for='apMaterno']").attr("class","active");

                $("#form-editarUsuarioForm").find("input[name='hospital']").val(hospitalsede);
                $("#form-editarUsuarioForm").find("label[for='hospital']").attr("class","active");

                $("#form-editarUsuarioForm").find("input[name='correo']").val(correo);
                $("#form-editarUsuarioForm").find("label[for='correo']").attr("class","active");

                $("#form-editarUsuarioForm").find("input[name='telefono']").val(telefono);
                $("#form-editarUsuarioForm").find("label[for='telefono']").attr("class","active");

                $("#form-editarUsuarioForm").find("input[name='usuario']").val(nomusuario);
                $("#form-editarUsuarioForm").find("label[for='usuario']").attr("class","active");

                $("#form-editarUsuarioForm").find("input[name='contraseña']").val(contra);
                $("#form-editarUsuarioForm").find("label[for='contraseña']").attr("class","active");
                console.log(rol)
                $("#form-editarUsuarioForm").find("select[name='rol'] > option[value='"+rol+"']").attr("selected","selected");
                $("#form-editarUsuarioForm").find("select").material_select();
                $("#form-editarUsuarioForm").find("label[for='rol']").attr("class","active");


                $("#editarUsuario").modal('close');
                $("#form-buscarUsuario").attr("data-id",nomusuario);
                $("#editarUsuarioForm").modal('open');

            }
        });
        
        return false;
    });
    //Editar Usuario
    $("#form-editarUsuarioForm").submit(function(evt){
        var id= $("#form-editarUsuarioForm").attr("data-id");
        var nombre = $("#form-editarUsuarioForm").find("input[name='nombre']").val();
        var appaterno = $("#form-editarUsuarioForm").find("input[name='apPaterno']").val();
        var apmaterno = $("#form-editarUsuarioForm").find("input[name='apMaterno']").val();
        var hospitalsede = $("#form-editarUsuarioForm").find("input[name='hospital']").val();
        var correo = $("#form-editarUsuarioForm").find("input[name='correo']").val();
        var telefono = $("#form-editarUsuarioForm").find("input[name='telefono']").val();
        var nomusuario = $("#form-editarUsuarioForm").find("input[name='usuario']").val();
        var contraseña = $("#form-editarUsuarioForm").find("input[name='contraseña']").val();
        var rol=$("#form-editarUsuarioForm").find("select[name='rol']").val();
        //Funcion de agregar rol
        $.ajax({
            url:"php/admin.php",
            method:"post",
            data:{
                operacion:'M',
                nomusuario:nomusuario,
                contra:contraseña,
                nombre:nombre,
                appaterno:appaterno,
                apmaterno:apmaterno,
                correo:correo,
                telefono:telefono,
                hospitalsede:hospitalsede,
                rol:rol
            }
        }).done(function(data){
            console.log(data);
            if(data.substring(0,1)=="N"){
                Materialize.toast("El nuevo usuario ya existe",2000,"rounded");
                $("#form-editarUsuarioForm").find("input[name='usuario']").val("");
                $("#form-editarUsuarioForm").find("input[name='usuario']").focus();
            }else if(data.substring(0,1)=="O"){
                var stg = "Se editó el usuario "+nomusuario;
                Materialize.toast(stg,2000,'rounded');
                $("#editarUsuarioForm").modal("close");
                mostrarUsuarios();
            }
        });
        return false;
    });

    //Buscar usuario para eliminar
    $("#form-eliminarUsuario").submit(function(evt){
        nombre="1";
        usuario="1";
        if($('input:radio[name=tipoBusqueda1]:checked').val()=="user") { 
            usuario=$(this).find("input[name='busqueda']").val();
        }
        if($('input:radio[name=tipoBusqueda1]:checked').val()=="nombre") { 
            nombre=$(this).find("input[name='busqueda']").val();
        }
        $.ajax({
            url:"php/admin.php",
            method:"post",
            data:{
                operacion:'C',
                nombre:nombre,
                nomusuario:usuario
            }
        }).done(function(data){
            if(data.substring(0,1)!="N"){
                if(nombre=="1")
                 $("#confirmarEliminar").find("span.usuario").html(usuario);
                if(usuario=="1")
                $("#confirmarEliminar").find("span.usuario").html(nombre);
                $("#buscarUsuario").modal("close");
                $("#confirmarEliminar").modal("open");
            }
            else{
                $("#buscarUsuario").modal("close");
                if(nombre=="1")
                var stg = "No se encontró el usuario \""+usuario+"\"";
                if(usuario=="1")
                var stg = "No se encontró el nombre \""+nombre+"\"";
                Materialize.toast(stg,2000,'rounded');
            }
        });

        return false;

    });
    //Eliminar alv
    $("#btnEliminarUsuario").click(function(evt){
        $("#confirmarEliminar").modal("close");
        if(nombre=="1")
             Materialize.toast("Se borró el "+usuario+" ",2000,"rounded");
        if(usuario=="1")
             Materialize.toast("Se borró el usuario con nombre "+nombre+" ",2000,"rounded");
        $("#confirmarEliminar").modal("close");
        $.ajax({
            url:"php/admin.php",
            method:"post",
            data:{
                operacion:'B',
                nomusuario:usuario,
                nombre:nombre
                
            }
        }).done(function(x){
            if(x.substring(0,1)=="O"){
                var stg = "Se eliminó el usuario "+$("#confirmarEliminar").find("span.usuario").html();
                Materialize.toast(stg,2000,"rounded");
            }
        });
        mostrarUsuarios();
    });
    //Buscar usuario para cambiar su contraseña
    $("#form-cambiarPass").submit(function(evt){
        nombre="1";
        usuario="1";
        if($('input:radio[name=tipoBusqueda2]:checked').val()=="user") { 
            usuario=$(this).find("input[name='busqueda']").val();
        }
        if($('input:radio[name=tipoBusqueda2]:checked').val()=="nombre") { 
            nombre=$(this).find("input[name='busqueda']").val();
        }
        $.ajax({
            url:"php/admin.php",
            method:"post",
            data:{
                operacion:'C',
                nombre:nombre,
                nomusuario:usuario
            }
        }).done(function(data){
            if(data.substring(0,1)!="N"){
                $("#cambiarPass").modal("close");
                $("#cambiarPass-form").modal("open");
            }
            else{
                $("#cambiarPass").modal("close");
                if(nombre=="1")
                var stg = "No se encontró el usuario \""+usuario+"\"";
                if(usuario=="1")
                var stg = "No se encontró el nombre \""+nombre+"\"";
                Materialize.toast(stg,2000,'rounded');
            }
        });

        return false;

    });
    //Cambiar contraseña
    $("#cambiarPass-form").submit(function(evt){
        var contraseña = $(this).find("input[name='contraseña']").val();
        var confirmarContraseña = $(this).find("input[name='confirmarContraseña']").val();

        console.log(contraseña+":::"+confirmarContraseña);
        if(contraseña == confirmarContraseña){
            //CAMBIAR CONTRASEÑA
            $("#cambiarPass-form").modal("close");
            
            $.ajax({
            url:"php/admin.php",
            method:"post",
            data:{
                operacion:'Con',
                nombre:nombre,
                nomusuario:usuario,
                contra:contraseña
            }
        }).done(function(data){
            if(nombre=="1")
                Materialize.toast("Se actualizó la contraseña del usuario "+usuario,2000,"rounded");
            if(usuario=="1")
                Materialize.toast("Se actualizó la contraseña del usuario "+nombre,2000,"rounded");
        });
            
        }else
            Materialize.toast("ERROR! Las contraseñas no coinciden",2000,"rounded");
        return false;
    });
    
    function mostrarUsuarios(){
    $.ajax({
        url:"php/admin.php",
        method:"post",
        data:{
            operacion:'L'
        }
    }).done(function(data){
        if(data=="[]"){
            $("#contenidoPrincipal").append("No hay usuarios por mostrar");
        }
        else{
            var listaUsuario = JSON.parse(data);
            var tabla = "";
            for(var k in listaUsuario){
                tabla+="<tr><td data-title='nombre' contenteditable='false'>"+listaUsuario[k].nombre+"</td> <td data-title='nomusuario' contenteditable='false'>"+listaUsuario[k].nomusuario+"</td> <td data-title='rol' contenteditable='false'>"+listaUsuario[k].rol+"</td></tr>";
            }
            $("#contenidoPrincipal > div > table > tbody").html(tabla);
        }

    });
}
});
