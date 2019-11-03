<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_tipo_proyecto']) && isset($_POST['id_empresa']) && isset($_POST['id_administrador'])
    && isset($_POST['nombre_proyecto']) && isset($_POST['direccion']) && isset($_POST['link_proyecto'])
    && isset($_POST['id_edificio'])){

    $id_tipo_proyecto=$_POST['id_tipo_proyecto'];
    $id_empresa=$_POST['id_empresa'];
    $id_administrador=$_POST['id_administrador'];
    $nombre_proyecto=$_POST['nombre_proyecto'];
    $direccion=$_POST['direccion'];
    $link_proyecto=$_POST['link_proyecto'];
    $id_edificio=$_POST['id_edificio'];

    $query="INSERT INTO proyectos VALUES(0,".$id_tipo_proyecto.",".$id_empresa.",".$id_administrador.",'".$nombre_proyecto.
        "','".$direccion."','".$link_proyecto."',".$id_edificio.")";

    if($conexion->query($query)==true){
        $salida['estado']='proyecto creado';
        echo json_encode($salida);
    }else{
        $salida['error']='query incorrecta';
        echo json_encode($salida);
    }

}else{
    $salida['error']='uno o mas datos vacios';
    echo json_encode($salida);
}
?>