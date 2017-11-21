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
            $q = "SELECT fechaemision,nopedido,p.proveedor as proveedor,cantidadsol * e.costocompra as importe,estado,cantidadsol,codequipo FROM pedido p INNER JOIN equipo e ON p.codequipo = e.codigo";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res))
                array_push($lista,$row);
            echo json_encode($lista);
        break;
        case "N":   //numero del siguiente pedido
            $q = "SELECT nopedido FROM pedido ORDER BY nopedido DESC LIMIT 1";
            $res = pg_query($q);
            if($res)
                echo intval($res)+1;
            else
                echo "3312";
        break;
        case "AP":
            $q = "INSERT INTO pedido VALUES('$numPedido','$fechaRecibes','$fechaEmision','$num_seguimiento','$op_envio','$codequipo','$proveedor','$piso','$cantidadsol','En ruta')";
            echo $q;
            $res = pg_query($q);
            if($res)
                echo "OK";
            else
                echo "NOK";
        break;
        case "B":
            $q = "SELECT sum(cantidadsol) FROM pedido WHERE nopedido='$noPedido' GROUP BY nopedido";
            $res = pg_query($q);
            if($row = pg_fetch_array($res))
                echo $row[0];
            else
                echo "NOK";
        break;
        case "CA":
            $q = "UPDATE pedido SET estado = 'Cancelado' WHERE nopedido='$nopedido'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res))
                echo "OK";
            else
                echo "NOK";
        break;
        case "E":
            $q = "SELECT * FROM pedido WHERE nopedido='$nopedido'";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res))
                array_push($lista,$row);
            echo json_encode($lista);
        break;
        case "M":
            $q = "UPDATE pedido SET cantidadsol = '$cantidad' WHERE nopedido='$nopedido' AND codequipo='$codigo'";
            $res = pg_query($q);
            if($res)
                echo "OK";
            else
                echo "NOK";
        break;
    }
?>
