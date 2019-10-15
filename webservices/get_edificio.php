<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_empresa'])){
    $id_empresa=$_POST['id_empresa'];

    $query="SELECT DISTINCT ed.nombre_edificio, pr.id_edificio FROM proyectos pr JOIN edificio ed ON ed.id_edificio=pr.id_edificio WHERE pr.id_empresa="
    .$id_empresa;
    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){
        $row=$ejecutarQuery->fetch_assoc();
        $salida['nombre_edificio']=$row['nombre_edificio'];
        $salida['id_edificio']=$row['id_edificio'];

        echo json_encode($salida);
    }else{
        $salida['error']='no existen edificios asociados';

        echo json_encode($salida);
    }
}else{
    $salida['error']='campos vacios';
    echo json_encode($salida);
}

$conexion->close();
?>