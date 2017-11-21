<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'A'://Alta
            $q = "SELECT nombre FROM departamento WHERE nombre = '".$nombreDepa."'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo "EXISTE";
            }
            else{
                $q2 = "INSERT INTO departamento VALUES('".$nombreDepa."')";
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
        case 'L':   //Listar todos alvs
            $q = "SELECT nombre,area FROM deparea";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res)){
                array_push($lista,$row);
            }
            echo json_encode($lista);
        break;
    }
?>
