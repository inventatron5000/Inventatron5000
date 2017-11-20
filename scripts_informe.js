var departamentosAreas;
var proveedores;
$(document).ready(function(){
    informeGeneral();
    listaPisosDepartamentosAreas();
    listaProveedores();
    $("#form-buscarPisoYDepartamento").submit(function(evt){
        var piso = $("#select_piso > option:selected").text();
        var depa = $("#select_depa > option:selected").text();
        var area = $("#select_area > option:selected").text();
        informePisoDepa(piso,depa,area);
        return false;
    });
    $("#btnPisoYDepartamento").click(function(evt){
        $("#BuscarPiso").modal("open");
    });
    $("#btnPisoYDepartamentoFAB").click(function(evt){
        $("#contenidoPrincipal").children("div").not("div#pisoYdepartamento").hide(200);
        $("div#pisoYdepartamento").show(200);
        $("#contenidoPrincipal > span.mensaje_error").html("");
        $("#BuscarPiso").modal("open");
    });

    $("#btnPedidosPendientesFAB").click(function(evt){
        informesPedidosPendientes();
        $("#contenidoPrincipal").children("div").not("div#pedidosPendientes").hide(200);
        $("div#pedidosPendientes").show(200);
        $("#contenidoPrincipal > span.mensaje_error").html("");
    });

    $("#btnPisoYDepartamento").click(function(evt){
        $("#BuscarPiso").modal("open");
    });


    $("#btnProveedorFAB").click(function(evt){
        $("#contenidoPrincipal").children("div").not("div#proveedor").hide(200);
        $("div#proveedor").show(200);
        $("#contenidoPrincipal > span.mensaje_error").html("");
    });
    $("#btnProveedor").click(function(evt){
        $("#BuscarProveedor").modal("open");
    });
    $("#form-buscarProveedor").submit(function(evt){
        var proveedor = $("#select_proveedor > option:selected").text();
        informeProveedor(proveedor);
        return false;
    });

    $("#btnVentasFAB").click(function(evt){
        $("#contenidoPrincipal").children("div").not("div#ventas").hide(200);
        $("div#ventas").show(200);
        $("#contenidoPrincipal > span.mensaje_error").html("");
    });
    $("#btnVentas").click(function(evt){
        $("#BuscarVentas").modal("open");
    });
});

function listaPisosDepartamentosAreas(){
    $.ajax({//Lista de Pisos
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:"LP"
        }
    }).done(function(data){
        //<option value="1" disabled="disabled" selected="selected">Option 1</option>
        if(data!="[]"){
            var listaPisos = JSON.parse(data);
            var optionPisos = "";
            for(var i in listaPisos)
                optionPisos+="<option value='"+listaPisos[i].direccionpiso+"'>"+listaPisos[i].nombrepiso+"</option>";
            $("#select_piso").html(optionPisos);
            $("#select_piso").material_select();
            $.ajax({//Lista de departamentos y areas
                url:"php/informes.php",
                method:"post",
                data:{
                    operacion:"LD"
                }
            }).done(function(x){
                if(x!="[]"){
                    var listaDepasAreas = JSON.parse(x);
                    departamentosAreas = [];
                    var opcionDepartamentos = "<option value='x' disabled selected>Seleccionar un departamento</option>";
                    var last="";
                    for(j in listaDepasAreas){
                        var nombre = listaDepasAreas[j].nombre;
                        var area = listaDepasAreas[j].area;
                        departamentosAreas.push({"nombre":nombre,"area":area});
                        if(last!=nombre)
                            opcionDepartamentos+="<option value='"+nombre+"'>"+nombre+"</option>";
                        last=nombre;
                    }
                    $("#select_depa").html(opcionDepartamentos);
                    $("#select_depa").material_select();
                    $("#select_depa").change(function(evt){
                        var depa = $("#select_depa > option:selected").text();
                        var opciones = "";
                        for(var k in departamentosAreas){
                            if(departamentosAreas[k].nombre==depa){
                                var area = departamentosAreas[k].area;
                                opciones+="<option value='"+area+"'>"+area+"</option>";
                            }
                        }
                        $("#select_area").html(opciones);
                        $("#select_area").material_select();
                    });
                }
            });
        }
    });
}

function informeGeneral(){
    $.ajax({
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:'G'
        }
    }).done(function(data){
        $("#contenidoPrincipal > span.mensaje_error").html("");
        if(data!="[]"){
            $("#general > table > tbody").html("");
            var informe = JSON.parse(data);
            var tabla = "";
            var totalEquipos = 0;
            var valorTotal = 0;
            for(var i in informe){ //piso,departamento,codigo,equipo,cantidad,valor,total :: nombrepiso,departamento,codigo,equipo,cantidad,costocompra,precioventa,totallinea
                tabla+="<tr><td data-title='Piso'>"+informe[i].nombrepiso+"</td>";
                tabla+="<tr><td data-title='Departamento'>"+informe[i].departamento+"</td>";
                tabla+="<tr><td data-title='Código'>"+informe[i].codigo+"</td>";
                tabla+="<tr><td data-title='Equipo'>"+informe[i].equipo+"</td>";
                tabla+="<tr><td data-title='Cantidad'>"+informe[i].cantidad+"</td>";
                tabla+="<tr><td data-title='Costo'>"+informe[i].costocompra+"</td>";
                tabla+="<tr><td data-title='Precio'>"+informe[i].precioventa+"</td>";
                tabla+="<tr><td data-title='Total en Línea'>"+informe[i].totallinea+"</td></tr>";
                totalEquipos+=parseInt(informe[i].totallinea);
                valorTotal+=parseInt(informe[i].totallinea)*parseInt(informe[i].costocompra);;
            }
            $("#general > .footer-copyright > div.row > div.col > label.totalEquipos").html(totalEquipos);
            $("#general > .footer-copyright > div.row > div.col > label.valorTotal").html(valorTotal);
            $("#general > table > tbody").html(tabla);
        }
        else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
            $("#general > .footer-copyright").hide();
        }
    });
}

function informePisoDepa(piso,depa,area){
    $.ajax({
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:'D',
            piso:piso,
            departamento:depa,
            area:area
    }
    }).done(function(data){
        $("#contenidoPrincipal > span.mensaje_error").html("");
        $("#pisoYdepartamento > table > tbody").html("");
        if(data!="[]"){
            $("#general > table > tbody").html("");
            var informe = JSON.parse(data);
            var tabla = "";
            var totalEquipos = 0;
            var valorTotal = 0;
            for(var i in informe){ //codigo,equipo,cantidad,costocompra,totalllinea,piso,departamento,area
                tabla+="<tr><td data-title='Código'>"+informe[i].codigo+"</td>";
                tabla+="<td data-title='Equipo'>"+informe[i].equipo+"</td>";
                tabla+="<td data-title='Cantidad'>"+informe[i].cantidad+"</td>";
                tabla+="<td data-title='Costo'>"+informe[i].costocompra+"</td>";
                tabla+="<td data-title='Total en línea'>"+informe[i].totallinea+"</td>";
                totalEquipos+=parseInt(informe[i].totallinea);
                valorTotal+=parseInt(informe[i].totallinea)*parseInt(informe[i].costocompra);;
            }
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.totalEquipos").html(totalEquipos);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.valorTotal").html(valorTotal);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.pisoInforme").html(piso);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.deptosInforme").html(depa);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.areaInforme").html(area);
            $("#pisoYdepartamento > table > tbody").html(tabla);

            $("#contenidoPrincipal").children("div").not("div#pisoYdepartamento").hide(200);
            $("div#pisoYdepartamento").show(200);

            $("#pisoYdepartamento > .footer-copyright").show();

        }
        else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
            $("#BuscarPiso").modal("close");
        }
    });
}

function listaProveedores(){
    $.ajax({
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:"LPR"
        }
    }).done(function(data){
        if(data!="[]"){
            console.log(data)
            var listaProveedores = JSON.parse(data);
            var opciones = "<option value='x' disabled selected>Seleccionar un Proveedor</option>";
            for(var i in listaProveedores)
                opciones+="<option value='"+listaProveedores[i].nombrepr+"'>"+listaProveedores[i].nombrepr+"</option>";
            $("#select_proveedor").html(opciones);
            $("#select_proveedor").material_select();
        }else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
        }
    });
}

function informeProveedor(proveedor){
    $.ajax({
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:"P",
            proveedor:proveedor
        }
    }).done(function(data){
        $("#contenidoPrincipal > span.mensaje_error").html("");
        $("#proveedor > table > tbody").html("");
        if(data!="[]"){
            $("#general > table > tbody").html("");
            var informe = JSON.parse(data);
            var tabla = "";
            var totalEquipos = 0;
            var valorTotal = 0;
            for(var i in informe){ //codigo,equipo,piso,cantidad,costocompra,totallinea
                tabla+="<tr><td data-title='Código'>"+informe[i].codigo+"</td>";
                tabla+="<td data-title='Equipo'>"+informe[i].equipo+"</td>";
                tabla+="<td data-title='Piso'>"+informe[i].piso+"</td>";
                tabla+="<td data-title='Cantidad'>"+informe[i].cantidad+"</td>";
                tabla+="<td data-title='Costo'>"+informe[i].costocompra+"</td>";
                tabla+="<td data-title='Total en línea'>"+informe[i].totallinea+"</td>";
                totalEquipos+=parseInt(informe[i].totallinea);
                valorTotal+=parseInt(informe[i].totallinea)*parseInt(informe[i].costocompra);;
            }
            $("#proveedor > .footer-copyright > div.row > div.col > label.totalEquipos").html(totalEquipos);
            $("#proveedor > .footer-copyright > div.row > div.col > label.valorTotal").html(valorTotal);
            $("#proveedor > .footer-copyright > div.row > div.col > label.proveedorInforme").html(proveedor);
            $("#proveedor > table > tbody").html(tabla);

            $("#contenidoPrincipal").children("div").not("div#proveedor").hide(200);
            $("div#proveedors").show(200);

            $("#proveedor > .footer-copyright").show();

        }
        else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
            $("#BuscarProveedor").modal("close");
        }
    });
}

function informesPedidosPendientes(){

}

function informeVentas(){

}
