<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

$query="SELECT MAX(id_proyecto) id_proyecto FROM proyectos";
$ejecutarQuery=$conexion->query($query);

if($ejecutarQuery){
    $row=$ejecutarQuery->fetch_assoc();

    $salida['id_proyecto']=$row['id_proyecto'];
    echo json_encode($salida);
}else{
    $salida['error']='no hay id proyecto';
}

?>