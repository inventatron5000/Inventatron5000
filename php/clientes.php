<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'A'://Alta
            $q = "SELECT nombrecl FROM cliente WHERE nombrecl = '".$nombreCliente."'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo "EXISTE";
            }
            else{
                $q2 = "INSERT INTO cliente VALUES('$nombreCliente','$personaContacto','$direccionFact','$ciudad','$estado','$cp','$pais','$telefono','$correo')";
                $res2 = pg_query($q2);
                if($res2){
                    echo "OK";
                }
                else
                    echo "NOK";
            }
        break;
        case 'C':   //Consultar un men
            $q = "SELECT * from cliente WHERE nombrecl = '$nombreCliente'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo json_encode($row);
            }
            else
                echo "NF";
        break;
        case 'L':   //Listar todos alvs
            $q = "SELECT nombrecl from cliente";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res)){
                array_push($lista,$row);
            }
            echo json_encode($lista);
        break;
        case 'M':   //Modificar
            $q0 = "SELECT nombrecl FROM cliente WHERE nombrecl='$nombreCliente' AND '$id'!='$nombreCliente'";
            $res0 = pg_query($q0);
            if($row0 = pg_fetch_array($res0))
                echo "NOK";
            else{
                $q = "UPDATE cliente SET nombrecl = '$nombreCliente',personacontactocl='$personaContacto',direccionfacturacion='$direccionFact',ciudad='$ciudad',estado='$estado',codpostal='$cp',pais='$pais',telefono='$telefono',correo='$correo' WHERE nombrecl='$id'";
                pg_query($q);
                echo "OK";
            }
        break;
        case 'B': //Baja
            $q0 = "DELETE FROM cliente WHERE nombrecl = '$nombreCliente'";
            $res = pg_query($q0);
            if($res)
                echo "OK";
            else
                echo "NOK";
        break;
    }
?>
