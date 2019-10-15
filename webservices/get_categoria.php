<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_categoria'])){

    $id_categoria=$_POST['id_categoria'];

    $query="SELECT * FROM categoria WHERE id_categoria=".$id_categoria;
    $ejecutarQuery=$conexion->query($query);

    if($ejecutarQuery->num_rows>0){
        $row=$ejecutarQuery->fetch_assoc();
        $salida['id_categoria']=$row['id_categoria'];
        $salida['categoria']=$row['categoria'];

        echo json_encode($salida);
    }else{
        $salida['error']='No existen datos';
        echo json_encode($salida);
    }
}

$conexion->close();
?>
