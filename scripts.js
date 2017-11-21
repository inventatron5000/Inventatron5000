validarLogin();
$(document).ready(function(){
    $(".button-collapse").sideNav();
   $(".modal").modal({
        //Esta funcion selecciona el primer tab (del icono home) cuando cierras un modal
        complete:function(data){
            $("ul.tabs").tabs('select_tab','home');
        }
    });
    $("select").material_select();
    $(".datepicker").pickadate({
        selectMonths:true,
        selectYears:false,
        today:"Hoy",
        clear:"Restablecer",
        close:"Cerrar",
        closeOnSelect:false,
        format: 'dd/mm/yyyy'
    });
});
function validarLogin(){
    $.ajax({//Validar la sesión
        url:"php/usuario.php",
        method:"post",
        data:{
            operacion:"S"
        }
    }).done(function(data){
        if(data=="NOK"){
            if(window.location.href.substr(window.location.href.length-10)!="index.html")
                window.location.href="index.html";
        }
        else{
            var usuario = JSON.parse(data);//usuario,nombre,rol
            if(usuario[2]!="A"){
                $(".btnAdmin").hide();
            }
        }
    });
}
