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

    $('#ventas').hide(); //muestro mediante id
	$('#proveedor').hide(); //muestro mediante clase
    $('#pisoYdepartamento').hide(); //muestro mediante clase
    $("#VerVentas").on( "click", function() {
<<<<<<< HEAD
            $("#BuscarVentas").modal("close");
            $('#proveedor').hide(); //muestro mediante clase
            $('#pisoYdepartamento').hide(); //muestro mediante clase
			$('#ventas').show(); //oculto mediante id 
		});
     $("#VerProveedor").on( "click", function() {
            $("#BuscarProveedor").modal("close");
            $('#ventas').hide(); //muestro mediante id
            $('#pisoYdepartamento').hide(); //muestro mediante clase
			$('#proveedor').show(); //oculto mediante id   
		})
    $("#VerPiso").on( "click", function() {
            $("#BuscarPiso").modal("close");
            $('#ventas').hide(); //muestro mediante id
            $('#proveedor').hide(); //oculto mediante id   
            $('#pisoYdepartamento').show(); //muestro mediante clase
		})
    $(".VerGeneral").on( "click", function() {
            $('#ventas').hide(); //muestro mediante id
			$('#proveedor').hide(); //muestro mediante clase
            $('#pisoYdepartamento').hide(); //muestro mediante clase
            $("ul.tabs").("tab-select","#VerGeneral");
		})
    $("#VerPedidos").on( "click", function() {
            $('#ventas').hide(); //muestro mediante id
			$('#proveedor').hide(); //muestro mediante clase
            $('#pisoYdepartamento').hide(); //muestro mediante clase
		})

});
=======
	   $('#ventas').hide(); //oculto mediante id
    });
     
});
>>>>>>> 72bf568315cbf72ceef89596b660aeba52080cb3
