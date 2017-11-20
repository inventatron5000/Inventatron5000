$(document).ready(function(){
    mostrarEquipos()
   $('.datepicker').pickadate({
          format: 'mm/dd/yyyy',
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    //llenar el select de departamento
    $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'SD'
            }
        }).done(function(data){
            $('#select_departamento').html(data);
            $('#select_departamento').material_select();
        });
    $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'SP'
            }
        }).done(function(data){
        //alert(data)
            $('#select_piso').html(data);
            $('#select_piso').material_select();
        });
    $("#select_departamento").change(function(){
            $('#select_area').material_select('destroy');
            var nombre= $( "#select_departamento option:selected" ).text();
            //alert(nombre);
            $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'SA',
                nombre:nombre
                
            }
        }).done(function(data){
        //alert(data)
            $('#select_area').html(data);
            $('#select_area').material_select();
        });
        });
    //Funcion para agregar un nuevo depa
    $("#form-agregarEquipo").submit(function(data){
        //Aqui pondría la función que registra a la base de datos, SU TUVIERAMOS UNA!
        var codigo =$(this).find("input[name='codigo']").val();
        var equipo = $(this).find("input[name='equipo']").val();
        var departamento= $( "#select_departamento option:selected" ).text();
        var area= $( "#select_area option:selected" ).text();
        var costocompra =$(this).find("input[name='costoC']").val();
        var precioventa =$(this).find("input[name='precioVen']").val();
        var modelo =$(this).find("input[name='modelo']").val();
        var serie=$(this).find("input[name='serie']").val();
        var piso= $( "#select_piso option:selected" ).text();
        var cantidad =$(this).find("input[name='cantidad']").val();
        var fechasolicitud=$(this).find("input[name='fechaSol']").val();
        var fecharecibo=$(this).find("input[name='fechaRecibo']").val();
        var fechainstalacion=$(this).find("input[name='fechaInst']").val();
        var proveedor=$(this).find("input[name='proveedor']").val();
        var str="Se dió de alta el equipo "+ equipo;
        alert(fechainstalacion);
        $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'A',
                codigo:codigo,
                equipo:equipo,
                departamento:departamento,
                area:area,
                costocompra:costocompra,
                precioventa:precioventa,
                modelo:modelo,
                serie:serie,
                piso:piso,
                cantidad:cantidad,
                fechasolicitud:fechasolicitud,
                fecharecibo:fecharecibo,
                fechainstalacion:fechainstalacion,
                proveedor:proveedor    
            }
        }).done(function(data){
            alert(data);
            if(data=="EXISTE")
                Materialize.toast("¡Ya existe ese equipo!",2000,"rounded");
            else if(data=="OK"){
                Materialize.toast(str,2000,"rounded");
                mostrarEquipos();
            }
            else
                Materialize.toast("Error inesperado",2000,"rounded");
        });
        

        //Borrar datos y cerrar modal
        $(this).find("input[name='codigo']").val("");
        $(this).find("input[name='equipo']").val("");
        //var departamento= $( "#select_departamento option:selected" ).text();
        //var area= $( "#select_area option:selected" ).text();
        $(this).find("input[name='costoC']").val("");
        $(this).find("input[name='precioVen']").val("");
        $(this).find("input[name='modelo']").val("");
        $(this).find("input[name='serie']").val("");
        //var piso= $( "#select_piso option:selected" ).text();
        $(this).find("input[name='cantidad']").val("");
        $(this).find("input[name='fechaSol']").val("");
        $(this).find("input[name='fechaRecibo']").val("");
        $(this).find("input[name='fechaInst']").val("");
        $(this).find("input[name='proveedor']").val("");
        $("#modal_agregar").modal('close');
        return false;
    });

    //Buscar un depa para editarlo
    $("#form-buscarEquipo").submit(function(evt){
        var buscarEquipo = $(this).find("input[name='buscarEquipo']").val();
        if(Math.random()<0.5){  //Existe
            var direccionPiso = "DATOS DE DB";  //Aqui asigno el valor obtenido de la db
            //Colocar los valores en el modal
            $("#editarEquipoForm").find("input[name='equipo']").val(buscarEquipo);
            $("#editarEquipoForm").find("label[for='equipo']").attr("class","active");
            //Cerrar ste modal y mostrar e lotro
            $("#editarEquipo").modal("close");
            $("#editarEquipoForm").modal("open");
        }else{                  //No existe
            var stg = "No se encontró el equipo \""+buscarEquipo+"\"";
            Materialize.toast(stg,1500,'rounded');
            $("#editarEquipo").modal("close");
        }
        return false;
    });
    //Editar un depa
    $("#form-editarEquipo").submit(function(evt){
        var codigo =$(this).find("input[name='codigo']").val();
        var equipo = $(this).find("input[name='equipo']").val();
        var modelo =$(this).find("input[name='modelo']").val();
        var serie=$(this).find("input[name='serie']").val();
        var cantidad =$(this).find("input[name='cantidad']").val();
        var costoC =$(this).find("input[name='costoC']").val();
        var precioVen =$(this).find("input[name='precioVen']").val();
        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $("#editarEquipoForm").modal("close");
        var stg = "Se editó el equipo "+equipo;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un piso y eliminarlo
    $("#form-eliminarEquipo").submit(function(evt){
        var buscarEquipo = $(this).find("input[name='buscarEquipo']").val();
        if(Math.random()<0.5){
            $("#confirmarEliminar").find("span.buscarEquipo").html(buscarEquipo);
            $("#modal_eliminar").modal("close");
            $("#confirmarEliminar").modal("open");
        }
        else{
            $("#modal_eliminar").modal("close");
            var stg = "No se encontró el equipo \""+buscarEquipo+"\"";
            Materialize.toast(stg,1500,'rounded');
        }
        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarEquipo").click(function(evt){
        $("#confirmarEliminar").modal("close");
        //FUNCION PARA BORRAR EN LA DB
        var stg = "Se eliminó el equipo "+$("#confirmarEliminar").find("span.buscarEquipo").html();
        Materialize.toast(stg,2000,"rounded");
    });
    
    function mostrarEquipos(){
    $.ajax({
        url:"php/equipo.php",
        method:"post",
        data:{
            operacion:'L'
        }
    }).done(function(data){
        if(data=="[]"){
            $("#contenidoPrincipal").append("No hay equipos por mostrar");
        }
        else{
            var listaEquipo = JSON.parse(data);
            var tabla = "";
            for(var k in listaEquipo){
                tabla+="<tr><td data-title='codigo' contenteditable='false'>"+listaEquipo[k].codigo+"</td> <td data-title='equipo' contenteditable='false'>"+listaEquipo[k].equipo+"</td> <td data-title='departamento' contenteditable='false'>"+listaEquipo[k].departamento+"</td> <td data-title='area' contenteditable='false'>"+listaEquipo[k].area+"</td> <td data-title='piso' contenteditable='false'>"+listaEquipo[k].piso+"</td><td data-title='modelo' contenteditable='false'>"+listaEquipo[k].modelo+"</td> <td data-title='serie' contenteditable='false'>"+listaEquipo[k].serie+"</td> <td data-title='costocompra' contenteditable='false'>"+listaEquipo[k].costocompra+"</td> <td data-title='precioventa' contenteditable='false'>"+listaEquipo[k].precioventa+"</td></tr>";
            }
            $("#contenidoPrincipal > div > table > tbody").html(tabla);
        }

    });
}
});