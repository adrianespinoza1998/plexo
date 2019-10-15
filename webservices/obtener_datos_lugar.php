<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['estancia_id_estancia'])){

    $estancia_id_estancia=$_POST['estancia_id_estancia'];

    $salida=array();

    $query="SELECT co2,temperatura,humedad FROM mediciones WHERE id_estancia=".$estancia_id_estancia;

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
    $salida['estado']='estancia_id_estancia vacio';
    echo json_encode($salida);
}

$conexion->close();
?>
