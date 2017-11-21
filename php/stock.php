<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case "EP":   //Lista de equipos por cada proveedor
            $q = "SELECT codigo,equipo,costocompra FROM equipo INNER JOIN proveedor ON proveedor=nombrepr WHERE proveedor = '$proveedor'";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res))
                array_push($lista,$row);
            echo json_encode($lista);
        break;
        case "L":
            $q = "SELECT fechaemision,nopedido,p.proveedor as proveedor,cantidadsol * e.costocompra as importe FROM pedido p INNER JOIN equipo e ON p.codequipo = e.codigo";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res))
                array_push($lista,$row);
            echo json_encode($lista);
        break;
    }
?>
