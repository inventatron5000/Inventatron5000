$(document).ready(function(){
    $("#btnPisoYDepartamentoFAB").click(function(evt){
        $("#contenidoWrapper").children("div").not("div#pisoYdepartamento").hide(200);
        $("div#pisoYdepartamento").show(200);
    });
    $("#btnPisoYDepartamento").click(function(evt){
        $("#BuscarPiso").modal("open");
    });


    $("#btnPedidosPendientesFAB").click(function(evt){
        $("#contenidoWrapper").children("div").not("div#pedidosPendientes").hide(200);
        $("div#pedidosPendientes").show(200);
    });


    $("#btnPisoYDepartamentoFAB").click(function(evt){
        $("#contenidoWrapper").children("div").not("div#pisoYdepartamento").hide(200);
        $("div#pisoYdepartamento").show(200);
    });
    $("#btnPisoYDepartamento").click(function(evt){
        $("#BuscarPiso").modal("open");
    });


    $("#btnProveedorFAB").click(function(evt){
        $("#contenidoWrapper").children("div").not("div#proveedor").hide(200);
        $("div#proveedor").show(200);
    });
    $("#btnProveedor").click(function(evt){
        $("#BuscarProveedor").modal("open");
    });

    $("#btnVentasFAB").click(function(evt){
        $("#contenidoWrapper").children("div").not("div#ventas").hide(200);
        $("div#ventas").show(200);
    });
    $("#btnVentas").click(function(evt){
        $("#BuscarVentas").modal("open");
    });

});
