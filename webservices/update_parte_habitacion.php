<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_parte_habitacion']) && isset($_POST['material'])){

    $id_parte_habitacion=$_POST['id_parte_habitacion'];
    $material=$_POST['material'];

    $salida=array();

    $query="SELECT * FROM partes_habitacion";

    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){

        $queryUpdate="UPDATE partes_habitacion set material='".$material."' WHERE id_parte_habitacion='".$id_parte_habitacion."'";

        $ejecutarQueryUpdate=$conexion->query($queryUpdate);

        if($ejecutarQueryUpdate){
            $salida['estado']='datos actualizados';
            echo json_encode($salida);
        }else{
            $salida['estado']='datos no actualizados';
            echo json_encode($salida);
        }
    }else{
        $salida['estado']='parte no existe';
        echo json_encode($salida);
    }
}else{
    $salida['estado']='campos vacios';
    echo json_encode($salida);
}

$conexion->close();
?>
