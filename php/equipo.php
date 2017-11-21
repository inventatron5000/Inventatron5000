<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'SD'://llenar select departamento
            $query="SELECT nombre FROM departamento ";
            $result = pg_query($query); 
            if(strcmp ($nombre,"1" )==0){
               while (($fila = pg_fetch_array($result)) != NULL) {
               echo '<option  selected="selected" value="'.$fila["nombre"].'">'.$fila["nombre"].'</option>';
                } 
            }
            else{
                while (($fila = pg_fetch_array($result)) != NULL) {
                    if(strcmp ($fila["nombre"],$nombre)==0){
                        $campo=$fila["nombre"];
                    }
                    else
                    echo '<option  selected="selected" value="'.$fila["nombre"].'">'.$fila["nombre"].'</option>';
                }
                echo '<option  selected="selected" value="1">'.$campo.'</option>';
            }
            
        break;
        case 'SA'://llenar select area
            $query="SELECT area FROM deparea where nombre='".$nombre."'";
            $result = pg_query($query); 
            if(strcmp ($funcion,"0" )==0){
            while (($fila = pg_fetch_array($result)) != NULL) {
                echo '<option selected="selected" value="'.$fila["area"].'">'.$fila["area"].'</option>';
            }
            }
            else{
                while (($fila = pg_fetch_array($result)) != NULL) {
                    if(strcmp ($fila["area"],$area)==0){
                        $campo=$fila["area"];
                    }
                    else{
                        echo '<option  selected="selected" value="'.$fila["area"].'">'.$fila["area"].'</option>';
                    }
                }
                 echo '<option  selected="selected" value="1">'.$campo.'</option>';
            }
        break;
        case 'SP'://llenar select piso
            $query="SELECT direccionpiso FROM piso";
            $result = pg_query($query); 
            if(strcmp ($direccionpiso,"1" )==0){
                while (($fila = pg_fetch_array($result)) != NULL) {
                echo '<option selected="selected" value="'.$fila["direccionpiso"].'">'.$fila["direccionpiso"].'</option>';
                }
            }
            else{
                while (($fila = pg_fetch_array($result)) != NULL) {
                    if(strcmp ($fila["direccionpiso"],$direccionpiso)==0){
                        $campo=$fila["direccionpiso"];
                    }
                    else
                    echo '<option  selected="selected" value="'.$fila["direccionpiso"].'">'.$fila["direccionpiso"].'</option>';
                }
                echo '<option  selected="selected" value="1">'.$campo.'</option>';
            }
            
        break;
        case 'A'://Alta
            $q = "SELECT codigo FROM equipo WHERE codigo = '".$codigo."'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo "EXISTE";
            }
            else{
                $q2 = "INSERT INTO equipo VALUES('$codigo','$equipo','$departamento','$area','$costocompra','$precioventa','$modelo','$serie','$piso','$cantidad','$fechasolicitud','$fecharecibo', '$fechainstalacion','$proveedor' )";
                $res2 = pg_query($q2);
                if($res2){
                    echo "OK";
                }
                else
                    echo "NOK";
            }
        break;
        case 'C':
            if(strcmp ($codigo,"1" )==0 && strcmp ($equipo,"1")!=0)
            $q = "SELECT * from equipo WHERE equipo = '$equipo'";
            if(strcmp ($equipo,"1" )==0 && strcmp ($codigo,"1")!=0)
            $q = "SELECT * from equipo WHERE codigo = '$codigo'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo json_encode($row);
            }
            else
                echo "NF";
        break;
        case 'L':   //Listar todos alvs
            $q = "SELECT codigo,equipo,departamento,area,piso,modelo,serie,costocompra,precioventa from equipo";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res)){
                array_push($lista,$row);
            }
            echo json_encode($lista);
        break;
        case 'M':   //Modificar
            $q0 = "SELECT codigo FROM equipo WHERE equipo='$equipo'";
            $res0 = pg_query($q0);
            if(pg_num_rows($res0)<0)
                echo "NOK";
            else{
                $q = "UPDATE equipo SET codigo= '$codigo', equipo='$equipo',departamento='$departamento',area='$area',costocompra='$costocompra',precioventa='$precioventa',modelo='$modelo',serie='$serie',piso='$piso',cantidad='$cantidad',fechasolicitud='$fechasolicitud',fecharecibo='$fecharecibo',fechainstalacion='$fechainstalacion' WHERE codigo='$codigo'";
                pg_query($q);
                echo "OK";
            }
        break;
        case 'B': //Baja
            if(strcmp ($codigo,"1" )==0 && strcmp ($equipo,"1")!=0)
            $q0 = "DELETE FROM equipo WHERE equipo = '$equipo'";
            if(strcmp ($equipo,"1" )==0 && strcmp ($codigo,"1")!=0)
            $q0 = "DELETE FROM equipo WHERE codigo = '$codigo'";
            $res = pg_query($q0);
            if($res)
                echo "OK";
            else
                echo "NOK";
        break;
    }
?>

