<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'A'://Alta
            $q = "SELECT area FROM area WHERE area = '".area."'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){
                //Si ya existe el área, solamente insertamos en la tabla que los relaciona (DEPAREA)
                $q3 = "INSERT INTO deparea VALUES('$nombreDepa','$area')";
                $res3 = pg_query($q3);
            }
            else{
                //Si no existe, insertamos en la tabla AREA y en DEPAREA
                $q4 = "INSERT INTO area VALUES('$area')";
                $res4 = pg_query($q4);

                $q5 = "INSERT INTO deparea VALUES('$nombreDepa','$area')";
                $res5 = pg_query($q5);

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
