<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'SD'://llenar select departamento
            $query="SELECT nombre FROM departamento";
            $result = pg_query($query); 
            while (($fila = pg_fetch_array($result)) != NULL) {
                echo '<option  selected="selected" value="'.$fila["nombre"].'">'.$fila["nombre"].'</option>';
            }
        break;
        case 'SA'://llenar select area
            $query="SELECT area FROM departamento where nombre='".$nombre."'";
            $result = pg_query($query); 
            while (($fila = pg_fetch_array($result)) != NULL) {
                echo '<option selected="selected" value="'.$fila["area"].'">'.$fila["area"].'</option>';
            }
        break;
        case 'SP'://llenar select piso
            $query="SELECT direccionpiso FROM piso";
            $result = pg_query($query); 
            while (($fila = pg_fetch_array($result)) != NULL) {
                echo '<option selected="selected" value="'.$fila["direccionpiso"].'">'.$fila["direccionpiso"].'</option>';
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

