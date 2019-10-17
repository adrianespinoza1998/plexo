<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_recinto'])){
    $id_recinto=$_POST['id_recinto'];

    $query='SELECT * FROM estancia WHERE id_recinto='.$id_recinto;
    $ejecutarQuery=$conexion->query($query);

    $salida=array();

    if($ejecutarQuery->num_rows>0){
        $i = 0;

        while ($row = mysqli_fetch_assoc($ejecutarQuery)) {
            $salida[$i] = $row;
            $i++;
        }

        echo json_encode($salida);
    }else{
        $salida['error']='no hay estancias';
        echo json_encode($salida);
    }

}else{
    $salida['error']='id recinto vacio';
    echo json_encode($salida);
}

?>