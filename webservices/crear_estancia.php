<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_recinto']) && isset($_POST['nombre_estancia']) && isset($_POST['ncaja'])){

    $id_recinto=$_POST['id_recinto'];
    $nombre_estancia=$_POST['nombre_estancia'];
    $ncaja=$_POST['ncaja'];

    $query="INSERT INTO estancia VALUES(0,".$id_recinto.",'".$nombre_estancia."',".$ncaja.")";

    if($conexion->query($query)==true){
        $salida['estado']='estancia creada';
        echo json_encode($salida);
    }else{
        $salida['error']='error al crear estancia en bd';
        echo json_encode($salida);
    }

}else{
    $salida['error']='uno o mas campos vacios post';
    echo json_encode($salida);
}
?>