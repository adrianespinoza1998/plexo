<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['nombre_empresa']) && isset($_POST['direccion']) && isset($_POST['nro']) && isset($_POST['telefono'])){

    $nombre_empresa=$_POST['nombre_empresa'];
    $direccion=$_POST['direccion'];
    $nro=$_POST['nro'];
    $telefono=$_POST['telefono'];

    $query="INSERT INTO empresa VALUES(0,'".$nombre_empresa."','".$direccion."',".$nro.",".$telefono.")";

    if($conexion->query($query)==true){
        $salida['estado']='empresa creada';
        echo json_encode($salida);
    }else{
        $salida['error']='error al insertar empresa';
        $salida['query']=$query;
        echo json_encode($salida);
    }

}else{
    $salida['error']='Uno o mas campos vacios';
    echo json_encode($salida);
}

$conexion->close();
?>
