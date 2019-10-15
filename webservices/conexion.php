<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

$conexion=new mysqli('localhost','plexo','<8:z?aWa?k7)Q@d-','plexo_bd');

if($conexion->connect_errno){
    die('Error al conectarse a la base de datos: '.$conexion->connect_errno);
}

?>
