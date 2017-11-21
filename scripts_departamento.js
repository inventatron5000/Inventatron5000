$(document).ready(function(){
    //Mostrar departamentos en la vista de departamentos
    mostrarDepartamentos();

    //Funcion para agregar un nuevo depa
    $("#form-agregarDepa").submit(function(){
        //Aqui pondría la función que registra a la base de datos, LA CUAL YA EXISTE
        ////////////////////////////////////////DEPARTAMENTOS
        var nombreDepa = $(this).find("input[name='nomDepa']").val();
        var areaDepas =$(this).find("input[name='areaDepa']").val();
        var seguir = false;
        alert(nombreDepa+" "+areaDepas+" "+seguir);
        $.ajax({
            url:"php/departamentos.php",
            method:"post",
            data:{
                operacion: 'A',
                nombreDepa:nombreDepa
            }
        }).done(function(data){
            alert(JSON.stringify(data));
            if(data=="EXISTE")
                Materialize.toast("¡Ya existe ese cliente!",2000,"rounded");
            else if(data=="OK"){
                seguir = true;
            }
            else
                Materialize.toast("Error inesperado",2000,"rounded");
        });


        if(seguir){
            ////////////////////////////////////////AREAS
                console.log("Areas sin modificar: "+areaDepas);
                //Debido a que pueden ser uno o varios departamentos separados por comas, primero verificamos que exista más de uno
                //Si la función indexOf regresa -1, solo hay un área a registrar
                if(areasDepas.indexOf(",")!=-1){
                    //Creamos un arreglo con cada una de las áreas separadas por coma
                    var areas = areaDepas.split(",");
                    //Hacemos una iteración por cada área que se halla registrado. De esta manera se inserta cada una de las áreas
                    for(var i = areas.length-1 ; i>=0 ; i--){
                        $.ajax({
                            url:"php/areas.php",
                            method:"post",
                            data:{
                                operacion: 'A',
                                nombreDepa:nombreDepa,
                                area:area[i]
                            }
                        }).done(function(data){
                                if(data=="OK"){
                                Materialize.toast(str,2000,"rounded");
                            }
                            else
                                Materialize.toast("Error inesperado",2000,"rounded");
                        });
                    }
                }
                //Solo hay un área y no necesita iterarse
                else{
                    $.ajax({
                            url:"php/areas.php",
                            method:"post",
                            data:{
                                operacion: 'A',
                                nombreDepa:nombreDepa,
                                area:areasDepas
                            }
                        }).done(function(data){
                                if(data=="OK"){
                                Materialize.toast(str,2000,"rounded");
                            }
                            else
                                Materialize.toast("Error inesperado",2000,"rounded");
                        });
                }
        }


        Materialize.toast(str,1500,'rounded');

        //Borrar datos y cerrar modal
        $(this).find("input[name='nomDepa']").val("");
        $(this).find("input[name='areaDepa']").val("");
        $("#agregarDepa").modal('close');
        alert("fin");
        return false;
    });

    //Buscar un depa para editarlo
    $("#form-buscarDepa").submit(function(evt){
        var nomDepa = $(this).find("input[name='nomDepa']").val();
        if(Math.random()<0.5){  //Existe
            var direccionPiso = "DATOS DE DB";  //Aqui asigno el valor obtenido de la db
            //Colocar los valores en el modal
            $("#editarDepaForm").find("input[name='nomDepa']").val(nomDepa);
            $("#editarDepaForm").find("label[for='nomDepa']").attr("class","active");
            //Cerrar ste modal y mostrar e lotro
            $("#editarDepa").modal("close");
            $("#editarDepaForm").modal("open");
        }else{                  //No existe
            var stg = "No se encontró el departamento \""+nomDepa+"\"";
            Materialize.toast(stg,1500,'rounded');
            $("#editarDepa").modal("close");
        }
        return false;
    });
    //Editar un depa
    $("#form-editarDepa").submit(function(evt){
        var nomDepa = $(this).find("input[name='nomDepa']").val();
        var areaDepa= $(this).find("input[name='areaDepa']").val();
        //AQUI VA LA FUNCION QUE CONECTA CON LA DB
        $("#editarDepaForm").modal("close");
        var stg = "Se editó el departamento "+nomDepa;
        Materialize.toast(stg,2000,'rounded');
        return false;
    });

    //Funcion para buscar un departamento y eliminarlo
    $("#form-eliminarDepa").submit(function(evt){
        var nomDepa = $(this).find("input[name='nomDepa']").val();
        if(Math.random()<0.5){
            $("#confirmarEliminar").find("span.nomDepa").html(nomDepa);
            $("#buscarDepa").modal("close");
            $("#confirmarEliminar").modal("open");
        }
        else{
            $("#buscarDepa").modal("close");
            var stg = "No se encontró el departamento \""+nomDepa+"\"";
            Materialize.toast(stg,1500,'rounded');
        }
        return false;
    });
    //Funcion para eliminar un departamento
    $("#btnEliminarDepa").click(function(evt){
        $("#confirmarEliminar").modal("close");
        //FUNCION PARA BORRAR EN LA DB
        var stg = "Se eliminó el departamento "+$("#confirmarEliminar").find("span.nomDepa").html();
        Materialize.toast(stg,2000,"rounded");
    });
});

function mostrarDepartamentos(){
    $.ajax({
        url:"php/departamentos.php",
        method:"post",
        data:{
            operacion:'L'
        }
    }).done(function(data){
        if(data=="[]")
            $("#contenidoPrincipal").append("No hay departamentos por mostrar");
        else{
            var listaDepartamentos = JSON.parse(data);
            var tabla = "";
            for(var k in listaDepartamentos)
                tabla+="<tr><td data-title='Nombre del depto.'>"+listaDepartamentos[k].nombre+"</td><td data-title='Áreas'>"+listaDepartamentos[k].area+"</td></tr>";
            $("#contenidoPrincipal > div > table > tbody").html(tabla);
        }

    });
}

