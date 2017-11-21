$(document).ready(function(){
    $("#form-login").submit(function(evt){
        var user = $("#nombreUsuario").val();
        var pass = $("#password").val();
        var subsistema = $("#subsistema > option:selected").val();
        $.ajax({
            url:"php/usuario.php",
            method:"post",
            data:{
                operacion:"L",
                user:user,
                pass:pass
            }
        }).done(function(data){
            if(data!="OK"){
                Materialize.toast("Las credenciales no son válidas",2000,"rounded");
                $("#nombreUsuario").val("");
                $("#nombreUsuario").focus();
                $("#password").val("");
            }else{
                window.location.href=subsistema+".html";
            }
        });
    });
});
