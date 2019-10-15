<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_edificio']) && isset($_POST['nombre_recinto']) && isset($_POST['numero_piso'])){

    $id_edificio=$_POST['id_edificio'];
    $nombre_recinto=$_POST['nombre_recinto'];
    $numero_piso=$_POST['numero_piso'];

    $query="INSERT INTO recinto VALUES(0,".$id_edificio.",'".$nombre_recinto."',".$numero_piso.")";

    if($conexion->query($query)==true){
        $salida['estado']='recinto creado';

        echo json_encode($salida);
    }else{
        $salida['error']='recinto no creado';

        echo json_encode($salida);
    }

}else{
    $salida['error']='uno o más campos vacios';

    echo json_encode($salida);
}
?>