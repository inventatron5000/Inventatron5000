<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'A'://Alta
            $q = "SELECT nomusuario FROM usuario where nomusuario='$nomusuario'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo "EXISTE";
            }
            else{
                $q2 = "INSERT INTO usuario VALUES('$nomusuario','$contra','$nombre','$appaterno','$apmaterno','$correo','$telefono','$hospitalsede','$rol')";
                $res2 = pg_query($q2);
                if($res2){
                    echo "OK";
                }
                else
                    echo "NOK";
            }
        break;
        case 'C':
            if(strcmp ($nomusuario,"1" )==0 && strcmp ($nombre,"1")!=0)
            $q = "SELECT * from usuario WHERE nombre = '$nombre'";
            if(strcmp ($nombre,"1" )==0 && strcmp ($nomusuario,"1")!=0)
            $q = "SELECT * from usuario WHERE nomusuario= '$nomusuario'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo json_encode($row);
            }
            else
                echo "NF";
        break;
        case 'L':   //Listar todos alvs
            $q = "SELECT nombre,nomusuario,rol from usuario";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res)){
                array_push($lista,$row);
            }
            echo json_encode($lista);
        break;
        case 'M':   //Modificar
            $q0 = "SELECT nomusuario FROM usuario where nomusuario='$nomusuario'";
            $res0 = pg_query($q0);
            if(pg_num_rows($res0)<0)
                echo "NOK";
            else{
                $q = "UPDATE usuario SET nomusuario= '$nomusuario', contra='$contra',nombre='$nombre',appaterno='$appaterno',apmaterno='$apmaterno',correo='$correo',telefono='$telefono',hospitalsede='$hospitalsede',rol='$rol' WHERE nomusuario='$nomusuario'";
                pg_query($q);
                echo "OK";
            }
        break;
            case 'Con':   //Modificar
            if(strcmp ($nomusuario,"1" )==0 && strcmp ($nombre,"1")!=0)
                $q = "UPDATE usuario SET contra='$contra' WHERE nombre='$nombre'";
            if(strcmp ($nombre,"1" )==0 && strcmp ($nomusuario,"1")!=0)
                $q = "UPDATE usuario SET contra='$contra' WHERE nomusuario='$nomusuario'";
                pg_query($q);
                echo "OK";
            
        break;
        case 'B': //Baja
            if(strcmp ($nomusuario,"1" )==0 && strcmp ($nombre,"1")!=0)
            $q0 = "DELETE FROM usuario WHERE nombre = '$nombre'";
            if(strcmp ($nombre,"1" )==0 && strcmp ($nomusuario,"1")!=0)
            $q0 = "DELETE FROM usuario WHERE nomusuario = '$nomusuario'";
            $res = pg_query($q0);
            if($res)
                echo "OK";
            else
                echo "NOK";
        break;
    }
?>
