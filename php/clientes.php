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
        case 'C':
            $q = "SELECT * from cliente WHERE nombrecl = '$nombreCliente'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo json_encode($row);
            }
            else
                echo "NF";
        break;
    }
?>
