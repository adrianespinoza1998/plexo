<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_recinto']) && isset($_POST['id_proyecto'])){
    $id_recinto=$_POST['id_recinto'];
    $id_proyecto=$_POST['id_proyecto'];

    $query="INSERT INTO recinto_proyecto VALUES(0,".$id_recinto.",".$id_proyecto.")";

    if($conexion->query($query)==true){
        $salida['estado']='recinto anexado';
        echo json_encode($salida);
    }else{
        $salida['error']='error al indexar recinto';
    }
}else{
    $salida['error']='uno o mas campos vacios';
    echo json_encode($salida);
}
?>