$(document).ready(function(){
    var edicion;
    //Mostrar clientes en la vista principal
    mostrarPisos();
    $("#contenidoPrincipal > div > table > tbody").delegate("tr","click",function(){
        var nombrepiso = $(this).find("td").html();
        $.ajax({
            url:"php/pisos.php",
            method:"post",
            data:{
                operacion:'C',
                numeroPiso:nombrepiso
            }
        }).done(function(data){
             var datosPiso = JSON.parse(data);

                var numeroPiso = datosPiso.nombrepiso;
                var direccionPiso = datosPiso.direccionpiso;

                //Colocar datos
                $("#mostrarPiso").find("input[name='numeroPiso']").val(numeroPiso);
                $("#mostrarPiso").find("label[for='numeroPiso']").attr("class","active");

                $("#mostrarPiso").find("input[name='direccionPiso']").val(direccionPiso);
                $("#mostrarPiso").find("label[for='direccionPiso']").attr("class","active");

                //Cerrar ste modal y mostrar e lotro
                $("#mostrarCliente").modal("open");
        });
    });
    
    //Funcion para agregar un nuevo piso
    $("#form-agregarPiso").submit(function(data){
        //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!
        var numeroPiso = $(this).find("input[name='numeroPiso']").val();
        var direccionPiso =$(this).find("input[name='direccionPiso']").val();

        //Borrar datos y cerrar modal
        $(this).find("input[name='numeroPiso']").val("");
        $(this).find("input[name='direccionPiso']").val("");
        $("#agregarPiso").modal('close');
        
        var str="Se dió de alta el piso "+numeroPiso;
        
        $.ajax({
            url:"php/pisos.php",
            method:"post",
            data:{
                operacion:'A',
                numeroPiso:numeroPiso,
                direccionPiso:direccionPiso,
            }
        }).done(function(data){
            if(data=="EXISTE")
                Materialize.toast("¡Ya existe ese piso!",2000,"rounded");
            else if(data=="OK"){
                Materialize.toast(str,2000,"rounded");
                mostrarPisos();}
            else
                Materialize.toast("Error inesperado",2000,"rounded");
        });
        
        $(this).find("input[name='numeroPiso']").val("");
        $(this).find("input[name='direccionPiso']").val("");
        $("#agregarPiso").modal('close');
        return false;
    });

    //Buscar un piso para editarlo
    $("#form-buscarPiso").submit(function(evt){
        var numeroPiso = $(this).find("input[name='numeroPiso']").val();
        $.ajax({
            url:"php/pisos.php",
            method:"post",
            data:{
                operacion:'C',
                numeroPiso:numeroPiso
            }
        }).done(function(data){
            if(data=="NF"){
                Materialize.toast("Piso no encotrado",2000,'rounded');
            }else{
                var datosPiso = JSON.parse(data);

                var numeroPiso = datosPiso.direccionpiso;
                var direccionPiso = datosPiso.nombrepiso;
                edicion = numeroPiso;
                $("#editarPisoForm").find("input[name='numeroPiso']").val(numeroPiso);
                $("#editarPisoForm").find("label[for='numeroPiso']").attr("class","active");

                $("#editarPisoForm").find("input[name='direccionPiso']").val(direccionPiso);
                $("#editarPisoForm").find("label[for='direccionPiso']").attr("class","active");

                //Cerrar ste modal y mostrar e lotro
                $("#editarPiso").modal("close");
                $("#form-editar¨Piso").attr("data-id",numeroPiso);
                $("#editarPisoForm").modal("open");
            }
        });
        return false;
    });
    
    //Editar un piso
    $("#editarPisoForm").submit(function(evt){
        var id= $(this).attr("data-id");
        var numeroPiso = $("#editarPisoForm").find("input[name='numeroPiso']").val();
        var direccionPiso = $("#editarPisoForm").find("input[name='direccionPiso']").val();
        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        
        $.ajax({
            url:"php/pisos.php",
            method:"post",
            data:{
                operacion:'M',
                numeroPiso:numeroPiso,
                direccionPiso:direccionPiso,
                pisoant:edicion
            }
        }).done(function(data){
            console.log(data);
            if(data=="NOK"){
                Materialize.toast("El nuevo numero de piso ya existe",2000,"rounded");
                $("#form-editarPiso").find("input[name='numeroPiso']").val("");
                $("#form-editarPiso").find("input[name='numeroPiso']").focus();
            }else if(data=="OK"){
                var stg = "Se editó el Piso "+numeroPiso;
                Materialize.toast(stg,2000,'rounded');
                $("#editarPisoForm").modal("close");
                mostrarPisos();
            }
        });
        return false;
    });

    //Funcion para buscar un piso y eliminarlo
    $("#form-eliminarPiso").submit(function(evt){
        var nombrepiso = $(this).find("input[name='numeroPiso']").val();
        $.ajax({
            url:"php/pisos.php",
            method:"post",
            data:{
                operacion:'C',
                numeroPiso:nombrepiso
            }
        }).done(function(data){
            if(data!="NF"){
                $("#confirmarEliminar").find("span.numeroPiso").html(nombrepiso);
                $("#buscarPiso").modal("close");
                $("#confirmarEliminar").modal("open");
            }
            else{
                $("#buscarPiso").modal("close");
                var stg = "No se encontró el Piso \""+nombrepiso+"\"";
                Materialize.toast(stg,2000,'rounded');
            }
        }); 
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarPiso").click(function(evt){
        var nombrepiso = $("#confirmarEliminar").find("span.numeroPiso").html();
        $("#confirmarEliminar").modal("close");
        $.ajax({
            url:"php/pisos.php",
            method:"post",
            data:{
                operacion:'B',
                numeroPiso:nombrepiso
            }
        }).done(function(x){
            if(x=="OK"){
                var stg = "Se eliminó el piso "+$("#confirmarEliminar").find("span.numeroPiso").html();
                Materialize.toast(stg,2000,"rounded");
                mostrarPisos();
            }
        });
    });
    
    $("#imprimir").click(function(evt){
        window.print();
    });
});

function mostrarPisos(){
    $.ajax({
        url:"php/pisos.php",
        method:"post",
        data:{
            operacion:'L'
        }
    }).done(function(data){
        if(data=="[]")
            $("#contenidoPrincipal").append("No hay pisos por mostrar");
        else{
            var listaPisos = JSON.parse(data);
            var tabla = "";
            for(var k in listaPisos)
                tabla+="<tr><td data-title='Numero del Piso' contenteditable='false' class='btnVerPiso'>"+listaPisos[k].direccionpiso+"</td><td data-title='Numero del Piso' contenteditable='false'>"+listaPisos[k].nombrepiso+"</td></tr>";
            $("#contenidoPrincipal > div > table > tbody").html(tabla);
        }

    });
}
