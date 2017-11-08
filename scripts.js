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
        closeOnSelect:false
    });
});
