<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

$query="SELECT id_edificio, nombre_edificio FROM edificio";
$ejecutarQuery=$conexion->query($query);

$salida=array();

if($ejecutarQuery->num_rows>0) {
    $i = 0;

    while ($row = mysqli_fetch_assoc($ejecutarQuery)) {
        $salida[$i] = $row;
        $i++;
    }

    echo json_encode($salida);
}else{
    $salida['error']='No hay edificios';

    echo json_encode($salida);

}
?>