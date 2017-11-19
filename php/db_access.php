<?php
    $host="localhost";      //http://dsc.itmorelia.edu.mx
    $port="5432";
    $user="postgres";       //a14121463
    $password="d4fx4v9u";   //Tu contaseña de postgres
    $db="inventarioSMLV";          //bd_14121463
    $conexion = pg_connect("host=$host port=$port user=$user password=$password dbname=$db") or die("Error en la base datos: ".pg_last_error($conexion));
?>
