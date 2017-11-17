$(document).ready(function(){
			$('#ventas').hide(); //muestro mediante id
			$('#proveedor').hide(); //muestro mediante clase
            $('#pisoYdepartamento').hide(); //muestro mediante clase
    $("#VerVentas").on( "click", function() {
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