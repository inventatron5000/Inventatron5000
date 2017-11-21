<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'A'://Alta
            $q = "SELECT nombrepiso FROM piso WHERE direccionpiso = '".$numeroPiso."'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo "EXISTE";
            }
            else{
                $q2 = "INSERT INTO piso VALUES('$numeroPiso','$direccionPiso')";
                $res2 = pg_query($q2);
                if($res2){
                    echo "OK";
                }
                else
                    echo "NOK";
            }
        break;
        case 'C':
            $q = "SELECT * from piso WHERE direccionpiso = '$numeroPiso'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo json_encode($row);
            }
            else
                echo "NF";
        break;
        case 'L':   //Listar todos alvs
            $q = "SELECT direccionpiso, nombrepiso from piso order by direccionpiso";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res)){
                array_push($lista,$row);
            }
            echo json_encode($lista);
        break;
        case 'M':   //Modificar
            $q0 = "SELECT nombrepiso FROM piso WHERE direccionpiso='$pisoant'";
            $res0 = pg_query($q0);
            if(pg_num_rows($res0)==0)
                echo "NOK";
            else{
                $q = "UPDATE piso SET direccionpiso = '$numeroPiso',nombrepiso='$direccionPiso'  WHERE direccionpiso='$pisoant'";
                pg_query($q);
                echo "OK";
            }
        break;
        case 'B': //Baja
            $q0 = "DELETE FROM piso WHERE direccionpiso = '$numeroPiso'";
            $res = pg_query($q0);
            if($res)
                echo "OK";
            else
                echo "NOK";
        break;    
            
            
    }
?>
