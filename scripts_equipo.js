$(document).ready(function(){
    var departamento="1";
    var piso="1";
    var area="1";
    mostrarEquipos()
   $('.datepicker').pickadate({
          format: 'dd/mm/yyyy',
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    //llenar el select de departamento
    $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'SD',
                nombre:departamento
            }
        }).done(function(data){
            $('#select_departamento').html(data);
            $('#select_departamento').material_select();
        });
    $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'SP',
                direccionpiso:piso
            }
        }).done(function(data){
            $('#select_piso').html(data);
            $('#select_piso').material_select();
        });
    $("#select_departamento").change(function(){
            $('#select_area').material_select('destroy');
            var nombre= $( "#select_departamento option:selected" ).text();
            $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'SA',
                nombre:nombre,
                funcion:"0",
                area:"1"
                
            }
        }).done(function(data){
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
            if(data.substring(0,1)=="E")
                Materialize.toast("¡Ya existe ese equipo!",2000,"rounded");
            else{
            if(data.substring(0,1)=="O"){
                Materialize.toast(str,2000,"rounded");
                mostrarEquipos();
            }
            else
                Materialize.toast("Error inesperado",2000,"rounded");
                console.log(data)
            } 
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
        var codigo="1";
        var equipo="1";
        if($('input:radio[name=radio-gap]:checked').val()=="codigo") { 
            codigo=$(this).find("input[name='buscarEquipo']").val();
        }
        if($('input:radio[name=radio-gap]:checked').val()=="nombre") { 
            equipo=$(this).find("input[name='buscarEquipo']").val();
        }
        
        $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'C',
                codigo:codigo,
                equipo:equipo
            }
        }).done(function(data){
            if(data.substring(0,1)=="N"){
                Materialize.toast("404 alv",2000,'rounded');
            }else{
                var datosEquipo = JSON.parse(data);
                var codigo = datosEquipo.codigo;
                var equipo = datosEquipo.equipo;
                departamento = datosEquipo.departamento;
                area = datosEquipo.area;
                var costocompra = datosEquipo.costocompra;
                var precioventa = datosEquipo.precioventa;
                var modelo = datosEquipo.modelo;
                var serie = datosEquipo.serie;
                piso = datosEquipo.piso;
                var cantidad=datosEquipo.cantidad;
                var fechasolicitud=datosEquipo.fechasolicitud;
                var fecharecibo=datosEquipo.fecharecibo;
                var fechainstalacion=datosEquipo.fechainstalacion;
                var proveedor=datosEquipo.proveedor;
                
                $.ajax({
                    url:"php/equipo.php",
                    method:"post",
                data:{
                    operacion:'SD',
                    nombre: departamento
                }
                }).done(function(data){
                    $('#select_depa').html(data);
                    $('#select_depa').material_select();
                });
                $.ajax({
                    url:"php/equipo.php",
                    method:"post",
                data:{
                    operacion:'SP',
                    direccionpiso:piso
                }
                }).done(function(data){
                   
                    $('#select_pis').html(data);
                    $('#select_pis').material_select();
                });
                
                $.ajax({
                    url:"php/equipo.php",
                    method:"post",
                data:{
                    operacion:'SA',
                    nombre:departamento,
                    funcion:"1",
                    area:area
                }
                }).done(function(data){
                   
                    $('#select_ar').html(data);
                    $('#select_ar').material_select();
                });
                
                
                $("#select_depa").change(function(){
                    $('#select_ar').material_select('destroy');
                    var nombre= $( "#select_depa option:selected" ).text();
                $.ajax({
                    url:"php/equipo.php",
                    method:"post",
                data:{
                    operacion:'SA',
                    nombre:departamento,
                    funcion:"0",
                    area:"1"
                }
                }).done(function(data){
                    $('#select_ar').html(data);
                    $('#select_ar').material_select();
                });
                });

                //Colocar datos
                $("#editarEquipoForm").find("input[name='codigo']").val(codigo);
                $("#editarEquipoForm").find("label[for='codigo']").attr("class","active");

                $("#editarEquipoForm").find("input[name='equipo']").val(equipo);
                $("#editarEquipoForm").find("label[for='equipo']").attr("class","active");

                $("#editarEquipoForm").find("input[name='modelo']").val(modelo);
                $("#editarEquipoForm").find("label[for='modelo']").attr("class","active");

                $("#editarEquipoForm").find("input[name='serie']").val(serie);
                $("#editarEquipoForm").find("label[for='serie']").attr("class","active");

                $("#editarEquipoForm").find("#select_piso").val(piso);
                $("#editarEquipoForm").find("label[for='#select_piso']").attr("class","active");

                /*$("#editarEquipoForm").find("#select_departamento").val(departamento);
                $("#editarEquipoForm").find("label[for='select_departamento']").attr("class","active");
                
                $("#editarEquipoForm").find("#select_area']").val(area);
                $("#editarEquipoForm").find("label[for='select_area']").attr("class","active");*/
               
                $("#editarEquipoForm").find("input[name='cantidad']").val(cantidad);
                $("#editarEquipoForm").find("label[for='cantidad']").attr("class","active");

                $("#editarEquipoForm").find("input[name='costoC']").val(costocompra);
                $("#editarEquipoForm").find("label[for='costoC']").attr("class","active");
        
                $("#editarEquipoForm").find("input[name='precioVen']").val(precioventa);
                $("#editarEquipoForm").find("label[for='precioVen']").attr("class","active");
                
                $("#editarEquipoForm").find("input[name='fechaSole']").val(fechasolicitud);
                $("#editarEquipoForm").find("label[for='fechaSole']").attr("class","active");
                
                $("#editarEquipoForm").find("input[name='fechaRecibo']").val(fecharecibo);
                $("#editarEquipoForm").find("label[for='fechaRecibo']").attr("class","active");
                
                $("#editarEquipoForm").find("input[name='fechaInst']").val(fechainstalacion);
                $("#editarEquipoForm").find("label[for='fechaInst']").attr("class","active");
                
                
                //Cerrar ste modal y mostrar e lotro
                $("#editarEquipo").modal("close");
                $("#form-editarEquipo").attr("data-id",equipo);
                $("#editarEquipoForm").modal("open");
            }
        });
        
        return false;
    });
    //Editar un depa
    $("#form-editarEquipo").submit(function(evt){
        
        var id= $(this).attr("data-id");
        var codigo =$(this).find("input[name='codigo']").val();
        var equipo = $(this).find("input[name='equipo']").val();
        //var departamento= $('#select_departamento[value="0"]').val();
        //var area= $( "#select_area option:selected" ).text();
        var costocompra =$(this).find("input[name='costoC']").val();
        var precioventa =$(this).find("input[name='precioVen']").val();
        var modelo =$(this).find("input[name='modelo']").val();
        var serie=$(this).find("input[name='serie']").val();
        //var piso= $( "#select_piso option:selected" ).text();
        var cantidad =$(this).find("input[name='cantidad']").val();
        var fechasolicitud=$(this).find("input[name='fechaSole']").val();
        var fecharecibo=$(this).find("input[name='fechaRecibo']").val();
        var fechainstalacion=$(this).find("input[name='fechaInst']").val();
        var proveedor=$(this).find("input[name='proveedor']").val();
        $("#select_depa").change(function(){
         departamento= $( "#select_depa option:selected" ).text();
        });
        $("#select_ar").change(function(){
        area= $( "#select_ar option:selected" ).text(); 
        });
        $("#select_pis").change(function(){
        piso= $( "#select_pis option:selected" ).text();   
        });
        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'M',
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
            console.log(data);
            if(data.substring(0,1)=="N"){
                Materialize.toast("El nuevo codigo del nuevo equipo ya existe",2000,"rounded");
                $("#form-editarEquipo").find("input[name='codigo']").val("");
                $("#form-editarEquipo").find("input[name='codigo']").focus();
            }else if(data.substring(0,1)=="O"){
                var stg = "Se editó el equipo "+id;
                Materialize.toast(stg,2000,'rounded');
                $("#editarEquipoForm").modal("close");
                mostrarEquipos();
            }
        });
        return false;

    });

    //Funcion para buscar un piso y eliminarlo
    $("#form-eliminarEquipo").submit(function(evt){
        codigo="1";
        equipo="1";
        var buscarEquipo=$(this).find("input[name='buscarEquipo']").val();
        if($('input:radio[name=radio-1]:checked').val()=="codigo") { 
            codigo=$(this).find("input[name='buscarEquipo']").val();
        }
        if($('input:radio[name=radio-1]:checked').val()=="nombre") { 
            equipo=$(this).find("input[name='buscarEquipo']").val();
        }
        $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'C',
                codigo:codigo,
                equipo:equipo
            }
        }).done(function(data){
            if(data.substring(0,1)!="N"){
                $("#confirmarEliminar").find("span.buscarEquipo").html(buscarEquipo);
                $("#modal_eliminar").modal("close");
                $("#confirmarEliminar").modal("open");
            }
            else{
                $("#modal_eliminar").modal("close");
                var stg = "No se encontró el equipo \""+buscarEquipo+"\"";
                Materialize.toast(stg,2000,'rounded');
            }
        });

        return false;
    });
    //Funcion para eliminar un piso
    $("#btnEliminarEquipo").click(function(evt){
        $("#confirmarEliminar").modal("close");
        $.ajax({
            url:"php/equipo.php",
            method:"post",
            data:{
                operacion:'B',
                equipo:equipo,
                codigo:codigo
                
            }
        }).done(function(x){
            if(x.substring(0,1)=="O"){
                var stg = "Se eliminó el equipo "+$("#confirmarEliminar").find("span.equipo").html();
                Materialize.toast(stg,2000,"rounded");
                mostrarEquipos();
            }
        });
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
