<?php

header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_empresa']) && isset($_POST['id_edificio'])){

    $id_empresa=$_POST['id_empresa'];
    $id_edificio=$_POST['id_edificio'];

    $salida=array();

    $query="SELECT nombre_proyecto,link_proyecto,id_edificio,id_empresa FROM proyectos WHERE id_empresa=".$id_empresa.
        " AND id_edificio=".$id_edificio;

    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){
        $i=0;

        while ($row=mysqli_fetch_assoc($ejecutarQuery)){
            $salida[$i]=$row;
            $i++;
        }
    }else{
        $salida['estado']='error';
    }

    echo json_encode($salida);
}else{
    $salida['estado']='usuario_id_usuario vacio';
}

$conexion->close();
?>
