<?php
header('Access-Control-Allow-Origin: https://www.plexobuilding.com');
header('Content-Type: application/json');

include "conexion.php";

if($_POST['usuario']=='DmXFjQIwcwq8DdP4hu3c' && $_POST['contrasena']=='HTG1PyX9t1USjOHJk3Km'){

    $query="SELECT id_empresa, nombre_empresa FROM empresa";

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
        $salida['error']='no hay empresas';

        echo json_encode($salida);
    }
}else{
    $salida['error']='Usuario o contraseña incorrectos';

    echo json_encode($salida);
}

$conexion->close();
?>
