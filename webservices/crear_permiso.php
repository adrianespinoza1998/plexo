<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_proyecto']) && isset($_POST['id_usuario']) && isset($_POST['id_administrador_proyecto'])){

    $id_proyecto=$_POST['id_proyecto'];
    $id_usuario=$_POST['id_usuario'];
    $id_administrador_proyecto=$_POST['id_administrador_proyecto'];

    $query="INSERT INTO permisos_proyecto VALUES(0,".$id_proyecto.",".$id_usuario.",6,".$id_administrador_proyecto.");
";

    if($conexion->query($query)==true){
        $salida['estado']='permiso creado';
        echo json_encode($salida);
    }else{
        $salida['error']='error al insertar permiso en la base de datos';
        echo json_encode($salida);
    }
}else{
    $salida['error']='uno o más campos vacios';
    echo json_encode($salida);
}

?>