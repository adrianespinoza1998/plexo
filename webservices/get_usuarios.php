<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if(isset($_POST['id_empresa'])){

    $id_empresa=$_POST['id_empresa'];

    $query="SELECT id_usuario,nombre,ap_paterno FROM usuario WHERE id_empresa=".$id_empresa;

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
        $salida['error']='no hay usuarios';

        echo json_encode($salida);
    }
}else{
    $salida['error']='id_empresa vacio';

    echo json_encode($salida);
}

$conexion->close();
?>
