<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'G':    //Informe general
            $q = "SELECT * FROM informegeneral";
            $informe = array();
            $res = pg_query($q);
            while($row = pg_fetch_array($res))
                array_push($res,$row);
            echo json_encode($informe);
        break;
        case 'D':    //Informe por Piso y Departamento
            $q = "SELECT * FROM informepisodepa WHERE piso = '$piso' AND departamento = '$departamento' AND area = '$area'";
            $informe = array();
            $res = pg_query($q);
            while($row = pg_fetch_array($res))
                array_push($res,$row);
            echo json_encode($informe);
        break;
        case 'LP':  //Lista de pisos
            $q = "SELECT * FROM piso";
            $lista = array();
            $res = pg_query($q);
            while($row = pg_fetch_array($res))
                array_push($lista,$row);
            echo json_encode($lista);
        break;
        case "LD":  //Lista de departamentos y areas
            $q0 = "SELECT * FROM departamento ORDER BY nombre";
            $res0 = pg_query($q0);
            $lista = array();
            while($dep = pg_fetch_array($res0))
                array_push($lista,$dep);
            echo json_encode($lista);
        break;
        case "LPR":    //Lista proveedores
            $q = "SELECT nombrepr FROM proveedor";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res))
                array_push($lista,$row);
            echo json_encode($lista);
        break;
        case "P":   //Informe por proveedores
            $q = "SELECT * FROM informeproveedor WHERE proveedor='$proveedor'";
            $res = pg_query($q);
            $informe = array();
            while($row = pg_fetch_array($res))
                array_push($informe,$row);
            echo json_encode($informe);
        break;
        case "PP":
            $q = "SELECT * FROM informependientes";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res))
                array_push($lista,$row);
            echo json_encode($lista);
        break;
        case "V":   //codigo, equipo, costocompra,precioventa,fechaventa, costototal,ventatotal, gananciabruta
            $q = "SELECT * FROM informeventas WHERE fechaventa >= '$inicio' AND fechaventa<='$fin'";
            $res = pg_query($q);
            $informe = array();
            while($row = pg_fetch_array($res))
                array_push($informe,$row);
            echo json_encode($informe);
        break;
    }
?>
