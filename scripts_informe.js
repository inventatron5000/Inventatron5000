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
    });
    
    $("#btnPedidosPendientes").click(function(evt){
        informesPedidosPendientes();
    });

    $("#btnPisoYDepartamento").click(function(evt){
        $("#BuscarPiso").modal("open");
    });


    $("#btnProveedor").click(function(evt){
        $("#BuscarProveedor").modal("open");
    });
    $("#form-buscarProveedor").submit(function(evt){
        var proveedor = $("#select_proveedor > option:selected").text();
        informeProveedor(proveedor);
        return false;
    });

    $("#btnVentas").click(function(evt){
        $("#BuscarVentas").modal("open");
    });
    $("#form-buscarVentas").submit(function(evt){
        var inicio = $("#fecha-ini").val();
        var fin = $("#fecha-fin").val();
        informeVentas(inicio,fin);
        return false;
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
                optionPisos+="<option value='"+listaPisos[i].direccionpiso+"'>"+listaPisos[i].direccionpiso+"</option>";
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
            $("#general > div > table > tbody").html("");
            var informe = JSON.parse(data);
            var tabla = "";
            var totalEquipos = 0;
            var valorTotal = 0;
            for(var i in informe){ //piso,departamento,codigo,equipo,cantidad,valor,total :: nombrepiso,departamento,codigo,equipo,cantidad,costocompra,precioventa,totallinea
                tabla+="<tr><td data-title='Piso'>"+informe[i].nombrepiso+"</td>";
                tabla+="<td data-title='Departamento'>"+informe[i].departamento+"</td>";
                tabla+="<td data-title='Código'>"+informe[i].codigo+"</td>";
                tabla+="<td data-title='Equipo'>"+informe[i].equipo+"</td>";
                tabla+="<td data-title='Cantidad'>"+informe[i].cantidad+"</td>";
                tabla+="<td data-title='Costo'>"+informe[i].costocompra+"</td>";
                tabla+="<td data-title='Precio'>"+informe[i].precioventa+"</td>";
                tabla+="<td data-title='Total en Línea'>"+informe[i].totallinea+"</td></tr>";
                totalEquipos+=parseInt(informe[i].totallinea);
                valorTotal+=parseInt(informe[i].totallinea)*parseInt(informe[i].costocompra);;
            }
            $("#general > .footer-copyright > div.row > div.col > label.totalEquipos").html(totalEquipos);
            $("#general > .footer-copyright > div.row > div.col > label.valorTotal").html(valorTotal);
            $("#general > div > table > tbody").html(tabla);
            $("#general > .footer-copyright").show();
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
                tabla+="<td data-title='Total en línea'>"+informe[i].totallinea+"</td></tr>";
                totalEquipos+=parseInt(informe[i].totallinea);
                valorTotal+=parseInt(informe[i].totallinea)*parseInt(informe[i].costocompra);;
            }
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.totalEquipos").html(totalEquipos);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.valorTotal").html(valorTotal);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.pisoInforme").html(piso);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.deptosInforme").html(depa);
            $("#pisoYdepartamento > .footer-copyright > div.row > div.col > label.areaInforme").html(area);
            $("#pisoYdepartamento > div > table > tbody").html(tabla);

            $("#contenidoPrincipal").children("div").not("div#pisoYdepartamento").hide(200);
            $("div#pisoYdepartamento").show(200);

            $("#pisoYdepartamento > .footer-copyright").show();

        }
        else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
        }
        $("#BuscarPiso").modal("close");
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
            var listaProveedores = JSON.parse(data);
            var opciones = "<option value='x' disabled selected>Seleccionar un Proveedor</option>";
            for(var i in listaProveedores)
                opciones+="<option value='"+listaProveedores[i].nombrepr+"'>"+listaProveedores[i].nombrepr+"</option>";
            $("#select_proveedor").html(opciones);
            $("#select_proveedor").material_select();
             $("#proveedor > .footer-copyright").show();
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
            $("#general > div > table > tbody").html("");
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
                tabla+="<td data-title='Total en línea'>"+informe[i].totallinea+"</td></tr>";
                totalEquipos+=parseInt(informe[i].totallinea);
                valorTotal+=parseInt(informe[i].totallinea)*parseInt(informe[i].costocompra);;
            }
            $("#proveedor > .footer-copyright > div.row > div.col > label.totalEquipos").html(totalEquipos);
            $("#proveedor > .footer-copyright > div.row > div.col > label.valorTotal").html(valorTotal);
            $("#proveedor > .footer-copyright > div.row > div.col > label.proveedorInforme").html(proveedor);
            $("#proveedor > div > table > tbody").html(tabla);

            $("#contenidoPrincipal").children("div").not("div#proveedor").hide(200);
            $("div#proveedor").show(200);

            $("#proveedor > .footer-copyright").show();

        }
        else{
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
        }
        $("#BuscarProveedor").modal("close");
    });
}

function informesPedidosPendientes(){
    $.ajax({
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:"PP"
        }
    }).done(function(data){
        $("#contenidoPrincipal > span.mensaje_error").html("");
        $("#pedidosPendientes > div > table > tbody").html("");
        if(data!="[]"){
            console.log(data);
            var informes = JSON.parse(data);
            var tabla = "";
            for(var i in informes){     //nopedido,codequipo, cantidadsol, piso, costocompra, fecharecibo
                tabla+="<tr><td data-title='No. Pedido'>"+informes[i].nopedido+"</td>";
                tabla+="<td data-title='Código'>"+informes[i].codequipo+"</td>";
                tabla+="<td data-title='Cantidad'>"+informes[i].cantidadsol+"</td>";
                tabla+="<td data-title='Piso'>"+informes[i].piso+"</td>";
                tabla+="<td data-title='Costo'>"+informes[i].costocompra+"</td>";
                tabla+="<td data-title='Fecha Recibo'>"+informes[i].fecharecibo+"</td></tr>";
            }
            $("#pedidosPendientes > div > table > tbody").html(tabla);
            $("#contenidoPrincipal").children("div").not("div#pedidosPendientes").hide(200);
            $("div#pedidosPendientes").show(200);
            $("#contenidoPrincipal > span.mensaje_error").html("");
        }
        else
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
        $("#BuscarPiso").modal("close");
    });
}

function informeVentas(ini,fin){
    $.ajax({
        url:"php/informes.php",
        method:"post",
        data:{
            operacion:"V",
            inicio:ini,
            fin:fin
        }
    }).done(function(data){
        $("#contenidoPrincipal > span.mensaje_error").html("");
        $("#ventas > div > table > tbody").html("");
        if(data!="[]"){
            console.log(data);
            var informes = JSON.parse(data); 
            var tabla = "";
            for(var i in informes){    //codigo, equipo, costocompra,precioventa,fechaventa, costototal,ventatotal, gananciabruta
                tabla+="<tr><td data-title='Código'>"+informes[i].codigo+"</td>";
                tabla+="<td data-title='Equipo'>"+informes[i].equipo+"</td>";
                tabla+="<td data-title='Costo'>"+informes[i].costocompra+"</td>";
                tabla+="<td data-title='Precio'>"+informes[i].precioventa+"</td>";
                tabla+="<td data-title='Fecha'>"+informes[i].fechaventa+"</td>";
                tabla+="<td data-title='Costo Total'>"+informes[i].costototal+"</td>";
                tabla+="<td data-title='Venta Total'>"+informes[i].ventatotal+"</td>";
                tabla+="<td data-title='Ganacia Bruta'>"+informes[i].gananciabruta+"</td>";
            }
            $("#ventas > div > table > tbody").html(tabla);
            $("#contenidoPrincipal").children("div").not("div#ventas").hide(200);
            $("div#ventas").show(200);
            $("#contenidoPrincipal > span.mensaje_error").html("");
        }
        else
            $("#contenidoPrincipal > span.mensaje_error").html("No hay informes por mostrar");
        $("#BuscarVentas").modal("close");
    });
}

function demoFromHTML(tabla) {
            var doc = new jsPDF();
            doc.text("Reporte del Hospital Star Medica Lomas Verdes", 40, 16);
            doc.setFontSize(11);
            doc.setTextColor(100);
            var text = "A continuación se presenta un reporte correspondiente a las actividades que se han llevado a cabo en el";
            doc.text(text, 14, 30);
            text = "Hospital Star Medica ubicado en Avenida Lomas Verdes 2165, Los Alamos, 53230 Naucalpan de Juárez,";
            doc.text(text, 14, 37);
            text = "Estado de México.";
            doc.text(text, 14, 44);
            var f=new Date();
            var cad=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
            text = "Se expide la presente el "+f.getDay()+" de "+f.getMonth()+" del "+f.getFullYear()+" a las "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
            doc.text(text, 14, 51);
            var elem = document.getElementById(tabla);
            var res = doc.autoTableHtmlToJson(elem);
            doc.autoTable(res.columns, res.data, {startY: 57});
            doc.save('Reporte.pdf');
            return doc;
}