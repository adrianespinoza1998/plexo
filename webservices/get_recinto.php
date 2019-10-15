<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_edificio'])){

    $id_edificio=$_POST['id_edificio'];

    $query="SELECT id_recinto,nombre_recinto FROM recinto WHERE id_edificio=".$id_edificio;
    $ejecutarQuery=$conexion->query($query);

    $salida=array();

    if($ejecutarQuery->num_rows>0){
        $i=0;
        while ($row=mysqli_fetch_assoc($ejecutarQuery)){
            $salida[$i]=$row;
            $i++;
        }

        echo json_encode($salida);
    }else{
        $salida['error']='no hay recintos';

        echo json_encode($salida);
    }

}else{
    $salida['error']='id_edificio vacio';

    echo json_encode($salida);
}
?>
