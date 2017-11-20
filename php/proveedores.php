<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case 'A'://Alta
            $q = "SELECT nombrepr FROM proveedor WHERE nombrepr = '".$nombreProveedor."'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo "EXISTE";
            }
            else{//nombrepr, personacontactopr, direccion, correo, telefono
                $q2 = "INSERT INTO proveedor VALUES('$nombreProveedor','$personaContacto','$direccion','$telefono','$correo')";
                $res2 = pg_query($q2);
                if($res2){
                    echo "OK";
                }
                else
                    echo "NOK";
            }
        break;
        case 'C':   //Consultar un men
            $q = "SELECT * from proveedor WHERE nombrepr = '$nombreProveedor'";
            $res = pg_query($q);
            if($row = pg_fetch_array($res)){//Ya existe
                echo json_encode($row);
            }
            else
                echo "NF";
        break;
        case 'L':   //Listar todos alvs
            $q = "SELECT nombrepr,direccion,correo,telefono from proveedor";
            $res = pg_query($q);
            $lista = array();
            while($row = pg_fetch_array($res)){
                array_push($lista,$row);
            }
            echo json_encode($lista);
        break;
        case 'M':   //Modificar
            $q0 = "SELECT nombrepr FROM proveedor WHERE nombrepr='$nombreProveedor' AND '$id'!='$nombreProveedor'";
            $res0 = pg_query($q0);
            if($row0 = pg_fetch_array($res0))
                echo "NOK";
            else{   //nombrepr, personacontactopr, direccion, correo, telefono
                $q = "UPDATE proveedor SET nombrepr = '$nombreProveedor',personacontactopr='$personaContacto',direccion='$direccion',telefono='$telefono',correo='$correo' WHERE nombrepr='$id'";
                pg_query($q);
                echo "OK";
            }
        break;
        case 'B': //Baja
            $q0 = "DELETE FROM proveedor WHERE nombrepr = '$nombreProveedor'";
            $res = pg_query($q0);
            if($res)
                echo "OK";
            else
                echo "NOK";
        break;
        case 'E':    //Correo (aunque sea domingo)
            $cabecera = "From: jogade.fcb@gmail.com \r\n Reply-To: jogade.fcb@gmail.com \r\n X-Mailer: Inventatron-5000";
            $res = mail($para,$titulo,$mensaje,$cabecera);
            if($res)
                echo "OK";
            else
                echo $res;
        break;
    }
?>
