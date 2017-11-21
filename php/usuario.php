<?php
    require("db_access.php");
    extract($_POST);
    switch($operacion){
        case "L":   //Login
            $q = "SELECT * FROM usuario WHERE nomusuario='$user' AND contra = '$pass'";
            $res = pg_query($q);
            if($usuario = pg_fetch_array($res)){//Acceso
                session_start();
                $_SESSION['usuario'] = $usuario['nomusuario'];
                $_SESSION['nombre'] = $usuario['nombre'];
                $_SESSION['rol'] = $usuario['rol'];
                echo "OK";
            }else
                echo "NOK";
        break;
        case "S":   //Validar sesion
            session_start();
            if(isset($_SESSION['usuario'])){
                $datos = array($_SESSION['usuario'],$_SESSION['nombre'],$_SESSION['rol']);
                echo json_encode($datos);
            }
            else
                echo "NOK";
        break;
    }
?>
